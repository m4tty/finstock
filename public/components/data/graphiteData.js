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
         		returnData[prop] = mapGraphiteData(data, options[prop]);
         	}
         }
      }

			var mean = returnData.target_mean[0];
			var lower = returnData.target_lower[0];
			var upper = returnData.target_upper[0];
			var median = (returnData.target_median.length > 0) ? returnData.target_median[0] : 0;
			var count = returnData.target_count[0];
			var std = returnData.target_std[0];
			var hostsCount = (returnData.target_hosts.length > 0) ? returnData.target_hosts[0] : options.hosts_manual;
			var hystricsStyle = {
					"reportingHosts": hostsCount,
					"name": options.name,
					"type": "HystrixCommand",
					"group": "group",
					"isCircuitBreakerOpen":false,
					"errorPercentage": 10,
					"errorCount":12,
					"requestCount":count,
					"rollingCountCollapsedRequests":1,
					"rollingCountExceptionsThrown":1,
					"rollingCountFailure":1,
					"rollingCountFallbackFailure":1,
					"rollingCountFallbackRejection":1,
					"rollingCountFallbackSuccess":1,
					"rollingCountResponsesFromCache":1,
					"rollingCountSemaphoreRejected":1,
					"rollingCountShortCircuited":1,
					"rollingCountSuccess":1,
					"rollingCountThreadPoolRejected":1,
					"rollingCountTimeout":1,
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

function mapGraphiteData(graphiteReturnData, target) {
	var data = [];
	if (graphiteReturnData !== null && graphiteReturnData !== undefined) {
		try {

			//var jsonGraphite = JSON.parse(graphiteReturnData);
			var jsonGraphite = graphiteReturnData;
			for (var i = jsonGraphite.length - 1; i >= 0; i--) {
				if (jsonGraphite[i].target.toLowerCase() == target.toLowerCase()) {
					var tempData = _.map(jsonGraphite[i].datapoints, function(val, key) {
						if (val) {
							if (val.length > 0) {
								return val[0];
							}
						}
					});
					[].push.apply(data, tempData);
				}

			}
		} catch (e) {

			//return callback(new Error('Unable to parse the response from graphite.'));
		}
	}
	//remove nulls?
	data = data.filter(function(val) { return val !== null; });
	return data;
}



})(window);