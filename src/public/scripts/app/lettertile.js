define(['jquery', 'app/events', 'app/letter', 'text!html/lettertile.html'], function($, Events, Letter, layout){
	
	LetterTile = function(x, y){
		// Private
		var letter = null;
		var element = null;
		var selected = false;
		
		// Privileged
		this.initialize = function(){
			letter = Letter.random();
		};
		
		/**
		 * Creates a DOM element for this tile and returns it. 
		 */
		this.render = function(){
			element = $(layout);
			element.text(letter.getChar());
			element.addClass('points-' + letter.getPoints());
			element.addClass('col-' + x);
			element.addClass('row-' + y);
			return element;
		};
		
		this.onClick = function(){
			if ( ! this.selected) {
				this.selected = true;
				Events.trigger('game:letterselected', this, letter);
			}
		};
	};
	
	return LetterTile;
});