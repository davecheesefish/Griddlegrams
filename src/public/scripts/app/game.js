define(['jquery', 'app/lettergrid', 'text!html/game.html'], function($, LetterGrid, layout){
	
	var Game = function(element){
		// Private
		var letterGrid = new LetterGrid();
		letterGrid.generate();
		
		// Privileged
		this.render = function(){
			element = $(layout);
			element.append(letterGrid.render());
			return element;
		};
	};
	
	return Game;
	
});