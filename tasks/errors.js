
var bsError = function(data) {
	browserSync.sockets.emit('fullscreen:message', {
		title: data.plugin + ': Ахтунг! У нас ' +data.name ,
		body: data.message
	}
)};
