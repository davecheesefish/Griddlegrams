define(['jquery', 'app/events', 'app/utils', 'app/letter', 'text!html/lettertile.html'], function($, Events, Utils, Letter, layout){
	
	LetterTile = function(x, y){
		// Private
		var letter = null;
		var $element = null;
		var selected = false;
		
		// Privileged
		this.initialize = function(){
			selected = false;
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
		
		/**
		 * Get whether this tile is currently selected or not.
		 */
		this.getSelected = function(){
			return selected;
		};
		
		/**
		 * Mark this tile as selected.
		 */
		this.select = function(){
			selected = true;
			$element.addClass('selected');
			Events.trigger('game.letterselected', [letter, this]);
		};
		
		/**
		 * Unmark this tile as selected.
		 */
		this.deselect = function(){
			selected = false;
			$element.removeClass('selected');
		};
		
		/**
		 * Replace this letter tile with a new one.
		 */
		this.replace = function(){
			this.initialize();
			$element.replaceWith(this.render());
		};
		
		this.onClick = function(){
			if ( ! selected) {
				Events.trigger('game.letterrequested', [this]);
			}
		};
	};
	
	return LetterTile;
});