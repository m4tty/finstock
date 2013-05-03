(function(window, undefined) {
	var finstock = {};
	if (window.finstock) {
	 	finstock = window.finstock;
	}
	if(!finstock.config) {
		finstock.config = {
			displays : [
				{
					"name":"WSODGetCourse",
					"graphiteHost": "http://graphite.tesla.ecollege.net",
					"target": "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.mean",
					"target_mean" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.mean",
					"target_median" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.median",
					"target_count" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.count",
					"target_upper" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.upper_90",
					"target_lower" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.lower",
					"target_std" : "stats.timers.cronica.dragnet.wsod.course-api.GET_courses-id.std",
					"target_hosts" : "",
					"hosts_manual" : "12"
				},
				{
					"name":"WSODGetThreadTopics",
					"graphiteHost": "http://graphite.tesla.ecollege.net",
					"target": "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.mean",
					"target_mean" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.mean",
					"target_median" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.median",
					"target_count" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.count",
					"target_upper" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.upper_90",
					"target_lower" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.lower",
					"target_std" : "stats.timers.cronica.dragnet.wsod.threads-api.GET_courses-id-threadeddiscussions-id-topics-id.std",
					"target_hosts" : "",
					"hosts_manual" : "4"
				}
			],
			title:'Make more Awesome',
			diplayKeys: [ {
				keyName: "Success",
				color: "green"
			},
			{
				keyName: "Failure",
				color: "red"
			}
			]
		};
	}
	window.finstock = finstock;
})(this);
//var full_url = graphite_url + "/render/?target=" + metric + "&format=json&from=-" + range + "s";