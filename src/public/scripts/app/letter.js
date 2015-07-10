define(function(){
	
	var Letter = function(char, points, frequency){
		// Private
		var char = char;
		var points = points;
		var frequency = frequency;
		
		// Privelidged
		this.getChar = function(){
			return char;
		};
		
		this.getPoints = function(){
			return points;
		};
		
		this.getFrequency = function(){
			return frequency;
		};
	};
	
	// Static members
	Letter.LETTERS = [
		new Letter('a',  1, 7),
		new Letter('b',  2, 3),
		new Letter('c',  2, 3),
		new Letter('d',  4, 6),
		new Letter('e',  1, 8),
		new Letter('f',  4, 6),
		new Letter('g',  2, 3),
		new Letter('h',  1, 4),
		new Letter('i',  1, 6),
		new Letter('j',  7, 1),
		new Letter('k',  7, 1),
		new Letter('l',  1, 4),
		new Letter('m',  2, 3),
		new Letter('n',  1, 4),
		new Letter('o',  1, 6),
		new Letter('p',  2, 3),
		new Letter('q', 10, 1),
		new Letter('r',  1, 4),
		new Letter('s',  1, 5),
		new Letter('t',  1, 5),
		new Letter('u',  3, 4),
		new Letter('v',  7, 1),
		new Letter('w',  4, 2),
		new Letter('x',  7, 2),
		new Letter('y',  2, 3),
		new Letter('z', 10, 1)
	];
	
	Letter.TOTAL_FREQUENCY = Letter.LETTERS.reduce(function(prev, current){ return prev + current.getFrequency(); }, 0);
	
	/**
	 * Get a random letter.
	 * @returns A random letter from Letter.LETTERS, weighted by their relative frequencies.
	 */
	Letter.random = function(){
		var rand = Math.random() * Letter.TOTAL_FREQUENCY;
		
		var total = 0;
		for (var index in Letter.LETTERS) {
			total += Letter.LETTERS[index].getFrequency();
			if (total >= rand) {
				return Letter.LETTERS[index];
			}
		}
	};
	
	return Letter;
});