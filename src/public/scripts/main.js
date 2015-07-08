requirejs.config({
	baseUrl: 'scripts/lib',
	paths: {
		app: '../app',
		html: '../html'
	}
});

// When everything's ready, start the game.
requirejs(['jquery', 'app/game'], function($, Game){
	$(document).ready(function(){
		var game = new Game();
		$('#main-content').append(game.render());
	});
});