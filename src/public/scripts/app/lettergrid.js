define(['jquery', 'app/utils', 'app/events', 'app/lettertile', 'text!html/lettergrid.html'], function($, Utils, Events, LetterTile, layout){
	
	var LetterGrid = function(){
		this.GRID_COLS = 10;
		this.GRID_ROWS = 10;
		this.letters = [];
		
		// Private
		var element;
		
		// Privileged
		this.initialize = function(){
			this.generate();
			Events.on('game.letterrequested', Utils.bindContext(this.onLetterRequested, this));
		};
		
		this.render = function(){
			element = $(layout);
			
			for (var row in this.letters){
				for (var col in this.letters[row]){
					element.append(this.letters[row][col].render());
				}
			}
			
			return element;
		};
		
		this.onLetterRequested = function(event, tile){
			//Check for neighbouring selected tiles
			//Gey x and y of tile
			var found = false;
			for (var y in this.letters){
				for (var x in this.letters[y]){
					if (this.letters[y][x] == tile){
						found = true;
						break;
					}
				}
				
				if (found)
					{ break; }
			}
		
			x = parseInt(x);
			y = parseInt(y);
			
			if (
				(this.letters[y][x - 1] != undefined && this.letters[y][x - 1].getSelected()) ||
				(this.letters[y][x + 1] != undefined && this.letters[y][x + 1].getSelected()) ||
				(this.letters[y - 1] != undefined && this.letters[y - 1][x].getSelected()) ||
				(this.letters[y + 1] != undefined && this.letters[y + 1][x].getSelected())
			){
				tile.select();
				return;
			}
			
			//If no neighbouring selected tiles, see if this is the first letter.
			var firstLetter = true;
			for (var y in this.letters){
				for (var x in this.letters[y]){
					if (this.letters[y][x].getSelected())
					{
						firstLetter = false;
						break;
					}
				}
				if (firstLetter == false)
					{ break; }
			}
			
			if (firstLetter)
			{
				tile.select();
				return;
			}
		};
	};
	
	// Public
	/**
	 * Generates a new grid of letters.
	 */
	LetterGrid.prototype.generate = function(){
		// Empty any tiles already here
		var newLetters = [];
		
		for (var y = 0; y < this.GRID_ROWS; y++) {
			newLetters[y] = [];
			for (var x = 0; x < this.GRID_COLS; x++) {
				var newLetter = new LetterTile(x, y);
				newLetter.initialize();
				newLetters[y].push(newLetter);
			}
		}
		
		this.letters = newLetters;
	};
	
	return LetterGrid;
});