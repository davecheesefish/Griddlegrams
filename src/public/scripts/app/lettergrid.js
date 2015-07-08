define(['jquery', 'app/lettertile', 'text!html/lettergrid.html'], function($, LetterTile, layout){
	
	var LetterGrid = function(){
		this.GRID_COLS = 10;
		this.GRID_ROWS = 10;
		this.letters = [];
		
		// Private
		var element;
		
		// Privileged
		this.render = function(){
			element = $(layout);
			
			for (var row in this.letters){
				for (var col in this.letters[row]){
					element.append(this.letters[row][col].render());
				}
			}
			
			return element;
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