'use strict';

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
		game.initialize();
		$('#main-content').empty().append(game.render());
	});
});