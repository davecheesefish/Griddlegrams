//Currently only supports British English, may support others in future.
define(['text!app/dictionary/en-gb.txt'], function(dictFile){
	
	Dictionary = {
		//Creates a massize array from a dictionary .txt file.
		//An API for checking words may be better, but would create annoying lag.
		words: dictFile.split('\r\n'),
		
		check: function(word){
			//TODO Improve dictionary search efficiency
			return (this.words.indexOf(word) != -1);
		}
	};
	
	return Dictionary;
});