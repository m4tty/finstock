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
	};
	GraphiteDataServices.prototype.getRawData = function(graphiteUrl, callback) {
		var data = [{"target": "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.mean", "datapoints": [[80.5, 1367448190], [93.0, 1367448200], [83.799999999999997, 1367448210], [135.0, 1367448220], [87.0, 1367448230], [null, 1367448240]]}];

		callback(data);
		// jQuery.get('http://graphite.tesla.ecollege.net/render/?target=stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.mean&format=json&from=-60s', function(data) {
			

		// 	console.log(data);
		// 	callback(null, data);
		// });
	};
	GraphiteDataServices.prototype.formatForHystrix = function(data, callback) {
		mapGraphiteData(data, function(err, returnData) {
			console.log(returnData);

//var fakeData = {data:"{\"name\":\"someName\",\"type\":\"HystrixCommand\",\"group\":\"group\",\"isCircuitBreakerOpen\":false,\"errorPercentage\":10,\"errorCount\":10,\"requestCount\":15,\"rollingCountCollapsedRequests\":1,\"rollingCountExceptionsThrown\":1,\"rollingCountFailure\":1,\"rollingCountFallbackFailure\":1,\"rollingCountFallbackRejection\":1,\"rollingCountFallbackSuccess\":1,\"rollingCountResponsesFromCache\":1,\"rollingCountSemaphoreRejected\":1,\"rollingCountShortCircuited\":1,\"rollingCountSuccess\":1,\"rollingCountThreadPoolRejected\":1,\"rollingCountTimeout\":1,\"currentConcurrentExecutionCount\":1,\"latencyExecute_mean\":100,\"latencyExecute\":{\"90\":100,\"99.5\":9871,\"99\":1111,\"50\":200},\"latencyTotal_mean\":300,\"latencyTotal\":400,\"propertyValue_circuitBreakerRequestVolumeThreshold\":1,\"propertyValue_circuitBreakerSleepWindowInMilliseconds\":1,\"propertyValue_circuitBreakerErrorThresholdPercentage\":1,\"propertyValue_circuitBreakerForceOpen\":1,\"propertyValue_circuitBreakerForceClosed\":1,\"propertyValue_executionIsolationStrategy\":1,\"propertyValue_executionIsolationThreadTimeoutInMilliseconds\":1,\"propertyValue_executionIsolationThreadInterruptOnTimeout\":1,\"propertyValue_executionIsolationSemaphoreMaxConcurrentRequests\":1,\"propertyValue_fallbackIsolationSemaphoreMaxConcurrentRequests\":1,\"propertyValue_requestCacheEnabled\":1,\"propertyValue_requestLogEnabled\":1,\"propertyValue_metricsRollingStatisticalWindowInMilliseconds\":1000}"};
	
			var hystricsStyle = {
					"name": "target.alias",
					"type": "HystrixCommand",
					"group": "group",
					"isCircuitBreakerOpen":false,
					"errorPercentage": 10,
					"errorCount":12,
					"requestCount":231,
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
					"latencyExecute_mean":100,
					"latencyExecute":200,
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
					"latencyExecute":{"90":100,"99.5":9871,"99":1111,"50":200}

			}


			callback(null, hystricsStyle);

		})
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

function mapGraphiteData(graphiteReturnData, callback) {
	var data = [];
	if (graphiteReturnData !== null && graphiteReturnData !== undefined) {
		try {

			//var jsonGraphite = JSON.parse(graphiteReturnData);
			var jsonGraphite = graphiteReturnData;
			for (var i = jsonGraphite.length - 1; i >= 0; i--) {
				var tempData = _.map(jsonGraphite[i].datapoints, function(val, key) {
					if (val) {
						if (val.length > 0) {
							return val[0];
						}
					}
				});
				[].push.apply(data, tempData);
			}
		} catch (e) {
			return callback(new Error('Unable to parse the response from graphite.'));
		}
	}
	//remove nulls?
	data = data.filter(function(val) { return val !== null; });
	return callback(null, data);
}



})(window);