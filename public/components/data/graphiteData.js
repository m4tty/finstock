(function(window) {

	jQuery.get(getRelativePath("../components/hystrixCommand/templates/hystrixCircuit.html"), function(data) {
		hystrixTemplateCircuit = data;
	});
	jQuery.get(getRelativePath("../components/hystrixCommand/templates/hystrixCircuitContainer.html"), function(data) {
		hystrixTemplateCircuitContainer = data;
	});

	function getRelativePath(path) {
		var p = location.pathname.slice(0, location.pathname.lastIndexOf("/")+1);
		return p + path;
	}
	function roundNumber(num) {
			var dec=1;
			var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
			var resultAsString = result.toString();
			if(resultAsString.indexOf('.') == -1) {
				resultAsString = resultAsString + '.0';
			}
			return resultAsString;
		};

	window.GraphiteDataServices = function (options) {
		var self = this; // keep scope under control
		self.options = options;
		if(self.options == undefined) {
			self.options = {};
		}
		// this.displays = options.displays;

	};
	GraphiteDataServices.prototype.getRawData = function(graphiteUrl, callback) {
		jQuery.get(graphiteUrl, function(data) {
			callback(null, data);
		});
	};
	GraphiteDataServices.prototype.formatForHystrix = function(options, data, callback) {

		var returnData = {};
		for (var prop in options) {
         if (options.hasOwnProperty(prop)) {
         	if (prop.indexOf("target") == 0) {
         		if (!returnData[prop]) {
         			returnData[prop] = mapGraphiteData(data, options[prop], prop);
         		}
         		//returnData[prop] = mapGraphiteData(data, options[prop], prop);
         	}
         }
      }

			var mean = returnData.target_mean[0];

			var lower = returnData.target_lower[0];
			var upper = returnData.target_upper[0];
			var median = (returnData.target_median.length > 0) ? returnData.target_median[0] : 0;
			var count = returnData.target_count[0];
			var target_primary_count = (returnData.target_primary_count && returnData.target_primary_count.length > 0) ? returnData.target_primary_count[0] : 0;
			var std = returnData.target_std[0];
			var hostsCount = (returnData.target_hosts.length > 0) ? returnData.target_hosts[0] : options.hosts_manual;
			var target_green = (returnData.target_green_count && returnData.target_green_count.length > 0) ? returnData.target_green_count[0] : 0;
			var target_red = (returnData.target_red_count && returnData.target_red_count.length > 0) ? returnData.target_red_count[0] : 0;
			var target_blue = (returnData.target_blue_count && returnData.target_blue_count.length > 0) ? returnData.target_blue_count[0] : 0;
			var target_orange = (returnData.target_orange_count && returnData.target_orange_count.length > 0) ? returnData.target_orange_count[0] : 0;
			var target_purple = (returnData.target_purple_count && returnData.target_purple_count.length > 0) ? returnData.target_purple_count[0] : 0;
			var failurePercentage = 0;
			target_green = Math.floor(target_green);
			target_red = Math.floor(target_red);
			if (target_green && target_red) {
				failurePercentage = (Number(target_green) / Number(target_red)) * 100;
			}

			var hystricsStyle = {
					"rollingFlushInterval" : options.rollingFlushInterval,
					"detailsLink" : options.detailUrl,
					"reportingHosts": hostsCount,
					"name": options.name,
					"type": "HystrixCommand",
					"group": "group",
					"isCircuitBreakerOpen":false,
					"errorPercentage": failurePercentage,	//not treating this like a percentage...
					"errorCount":12,
					"requestCount":target_primary_count,
					"rollingCountCollapsedRequests":1,
					"rollingCountExceptionsThrown":2,
					"rollingCountFailure":target_red,
					"rollingCountFallbackFailure":3,
					"rollingCountFallbackRejection":4,
					"rollingCountFallbackSuccess":6,
					"rollingCountResponsesFromCache":5,
					"rollingCountSemaphoreRejected":7,
					"rollingCountShortCircuited":target_blue,
					"rollingCountSuccess":target_green,
					"rollingCountThreadPoolRejected":target_purple,
					"rollingCountTimeout":target_orange,
					"currentConcurrentExecutionCount":1,
					"latencyExecute_mean":mean,
					"latencyExecute":201,
					"latencyTotal_mean":300,
					"latencyTotal":400,
					"propertyValue_circuitBreakerForceClosed":1,
					"propertyValue_circuitBreakerRequestVolumeThreshold":1,
					"propertyValue_circuitBreakerSleepWindowInMilliseconds":1,
					"propertyValue_circuitBreakerErrorThresholdPercentage":1,
					"propertyValue_circuitBreakerForceOpen":1,
					"propertyValue_executionIsolationStrategy":1,
					"propertyValue_executionIsolationThreadTimeoutInMilliseconds":1,
					"propertyValue_executionIsolationThreadInterruptOnTimeout":1,
					"propertyValue_executionIsolationSemaphoreMaxConcurrentRequests":1,
					"propertyValue_fallbackIsolationSemaphoreMaxConcurrentRequests":1,
					"propertyValue_requestCacheEnabled":1,
					"propertyValue_requestLogEnabled":1,
					"propertyValue_metricsRollingStatisticalWindowInMilliseconds":1000,
					"latencyExecute":{"lower":lower,"upper":upper,"std":std,"50":median}

			}
			callback(null, hystricsStyle);

	};


function checkMetricsArrayAgainstParams(metrics, min, max) {
	var metrics_min;
	var metrics_max;

	if (min !== null && min !== undefined) {
		metrics_min = _.min(metrics);
	}
	if (max !== null && max !== undefined) {
		metrics_max = _.max(metrics);
	}
	return (min <= metrics_min && metrics_max <= max);
}

function mapGraphiteData(graphiteReturnData, target, alias) {
	var data = [];
	if (graphiteReturnData !== null && graphiteReturnData !== undefined) {
		try {
			//TODO: deal with duplicates, as we may call this for target_x and target_y which could have the same underlying target, and we shouldn't push
			//var jsonGraphite = JSON.parse(graphiteReturnData);
			var jsonGraphite = graphiteReturnData;
			for (var i = jsonGraphite.length - 1; i >= 0; i--) {
				if (jsonGraphite[i].target.toLowerCase() == target.toLowerCase() || jsonGraphite[i].target.toLowerCase() == alias.toLowerCase()) {
					var tempData = _.map(jsonGraphite[i].datapoints, function(val, key) {
						if (val) {
							if (val.length > 0) {
								return val[0];
							}
						}
					});
					[].push.apply(data, tempData);
					break;
				}

			}
		} catch (e) {

			//return callback(new Error('Unable to parse the response from graphite.'));
		}
	}
	//configure treat nulls as 0...
	data = _.map(data, function(val) {
		return (val == null) ? 0 : val
	});

	//or remove nulls?  not good... since we relied on array position of zero... fix that or don't do this
	//data = data.filter(function(val) { return val !== null; });
	return data;
}



})(window);