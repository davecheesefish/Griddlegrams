define(function(){
	
	var Word = function(){
		var letters = [];
		
		/**
		 * Returns the word as a string.
		 */
		this.toString = function(){
			return letters.reduce(function(prev, current){return prev + current.getChar();}, '');
		};
		
		/**
		 * Returns the total score for all letters in this word. 
		 */
		this.getPoints = function(){
			return letters.reduce(function(prev, current){return prev + current.getPoints();}, 0);
		};
		
		/**
		 * Add a letter to the end of the word.
		 */
		this.addLetter = function(letter){
			letters.push(letter);
		};
	};
	
	return Word;
});