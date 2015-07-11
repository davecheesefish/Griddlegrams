define(['jquery', 'app/events', 'app/utils', 'app/letter', 'text!html/lettertile.html'], function($, Events, Utils, Letter, layout){
	
	LetterTile = function(x, y){
		// Private
		var letter = null;
		var $element = null;
		var selected = false;
		
		// Privileged
		this.initialize = function(){
			letter = Letter.random();
		};
		
		/**
		 * Creates a DOM element for this tile and returns it. 
		 */
		this.render = function(){
			$element = $(layout);
			$element.text(letter.getChar());
			$element.addClass('points-' + letter.getPoints());
			$element.addClass('col-' + x);
			$element.addClass('row-' + y);
			$element.on('click', Utils.bindContext(this.onClick, this));
			return $element;
		};
		
		this.getSelected = function(){
			return selected;
		};
		
		this.select = function(){
			selected = true;
			$element.addClass('selected');
			Events.trigger('game.letterselected', [letter, this]);
		};
		
		this.deselect = function(){
			selected = false;
			$element.removeClass('selected');
		};
		
		this.onClick = function(){
			if ( ! selected) {
				Events.trigger('game.letterrequested', [this]);
			}
		};
	};
	
	return LetterTile;
});