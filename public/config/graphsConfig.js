(function(window, undefined) {
	var finstock = {};
	if (window.finstock) {
	 	finstock = window.finstock;
	}
	if(!finstock.config) {
		finstock.config = {
			displays : [
				{
					"name":"blahGettest",
					"graphiteHost": "http://graphite.blahblahtest.net",
					"target_primary_count": "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
					//"target_upper_right_threshold" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.mean",
					"target_mean" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.mean",
					"target_median" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.median",
					"target_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
					"target_upper" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.upper_90",
					"target_lower" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.lower",
					"target_std" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.std",
					"target_hosts" : "",
					"target_green_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
					"target_red_count" : "",
					"target_orange_count" : "",
					"target_blue_count" : "",
					"target_purple_count" : "",
					"hosts_manual" : "3",
					"threshold_ok" : "",
					"threshold_low" : "",
					"threshold_med" : "",
					"threshold_high" : "",
					"threshold_type" : "error_rate" // mean, count
				},
				{
					"name":"blahGetThreadTopics",
					"graphiteHost": "http://graphite.blahblahtest.net",
					"target_primary_count": "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.count",
					"target_mean" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.mean",
					"target_median" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.median",
					"target_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.count",
					"target_upper" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.upper_90",
					"target_lower" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.lower",
					"target_std" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id-threadeddiscussions-id-topics-id.std",
					"target_hosts" : "",
					"hosts_manual" : "3"
				},
				{
					"name":"WhatsHapV2ActivityByUserId",
					"graphiteHost": "http://graphite.blahblahtest.net",
					"target_primary_count": "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.count",
					"target_mean" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.mean",
					"target_median" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.median",
					"target_count" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.count",
					"target_upper" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.upper_90",
					"target_lower" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.lower",
					"target_std" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.std",
					"target_hosts" : "",
					"hosts_manual" : "3",
					"from": "360s"
				},
				{
					"name":"WhatsHapV2ActivityByUserId",
					"graphiteHost": "http://graphite.blahblahtest.net",
					"target_primary_count": "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.count",
					"target_mean" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.mean",
					"target_median" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.median",
					"target_count" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.count",
					"target_upper" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.upper_90",
					"target_lower" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.lower",
					"target_std" : "stats.timers.cronica.activitystreams-rest.rtt.GET_users-id-whatshappeningfeed.std",
					"target_hosts" : "",
					"hosts_manual" : "3",
					"from": "360s"
				},
				{
					"name":"MessageEnrichment",
					"graphiteHost": "http://graphite.blahblahtest.net",
					"target_primary_count": "stats.cronica.dragnet.messages.received",
					"target_mean" : "stats.timers.cronica.dragnet.messages.processed.mean",
					"target_median" : "stats.timers.cronica.dragnet.messages.processed.median",
					"target_count" : "stats.cronica.dragnet.messages.received",
					"target_upper" : "stats.timers.cronica.dragnet.messages.processed.upper_90",
					"target_lower" : "stats.timers.cronica.dragnet.messages.processed.lower",
					"target_std" : "stats.timers.cronica.dragnet.messages.processed.std",
					"target_hosts" : "",
					"hosts_manual" : "3",
					"from": "40s",
					"threshold_ok" : "",
					"threshold_low" : "",
					"threshold_med" : "",
					"threshold_high" : "",
					"threshold_type" : "error_rate", // mean, count
					"target_green_count" : "stats.cronica.dragnet.messages.received",
					"target_red_count" : "alias(sum(stats.cronica.dragnet.messages.ignored.*),\"target_red_count\")",
					"target_orange_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
					"target_blue_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
					"target_purple_count" : "stats.timers.cronica.dragnet.blah.test-api.GET_tests-id.count",
				}

			],
			title:'Make more Awesome',
			counters_rollup_interval_seconds: 10
		};
	}
	window.finstock = finstock;
})(this);
//var full_url = graphite_url + "/render/?target=" + metric + "&format=json&from=-" + range + "s";