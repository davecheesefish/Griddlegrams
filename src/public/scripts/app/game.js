define(['jquery', 'app/events', 'app/utils', 'app/dictionary', 'app/word', 'app/lettergrid', 'app/infopanel', 'text!html/game.html'], function($, Events, Utils, Dictionary, Word, LetterGrid, InfoPanel, layout){
	
	var Game = function($element){
		// Private
		var letterGrid = null;
		var infoPanel = null;
		
		var timerInterval = null;
		var score = 0;
		var currentWord = null;
		var acceptedWords = [];
		
		//Public
		this.timeLimit = 300;
		this.timeLeft = this.timeLimit;
		
		// Privileged
		this.initialize = function(){
			letterGrid = new LetterGrid();
			letterGrid.initialize();
			
			infoPanel = new InfoPanel();
			infoPanel.initialize();
			infoPanel.updateTimer(this.timeLimit, 0);
			
			currentWord = new Word();
			
			//Fix "this" to be in correct context on callback by creating a new function in the correct context to begin with. 
			timerInterval = window.setInterval(
				(function(self){
					return function(){
						self.onTimeTick();
						
						if (self.timeLeft <= 0) {
							window.clearInterval(timerInterval);
						}
					}
				})(this),
				1000
			);
			
			Events.on('game.letterselected', Utils.bindContext(this.onLetterSelected, this));
			Events.on('game.wordsubmitrequested', Utils.bindContext(this.onWordSubmitRequested, this));
			Events.on('game.wordclearrequested', Utils.bindContext(this.clearCurrentWord, this));
		};
		
		this.render = function(){
			$element = $(layout);
			$element.append(letterGrid.render());
			$element.append(infoPanel.render());
			return $element;
		};
		
		this.clearCurrentWord = function(){
			currentWord = new Word();
			Events.trigger('game.wordcleared');
		};
		
		this.acceptCurrentWord = function(){
			score += currentWord.getPoints();
			Events.trigger('game.scoreupdated', [currentWord.getPoints(), score]);
			
			acceptedWords.push(currentWord);
			Events.trigger('game.wordaccepted', currentWord);
			
			this.clearCurrentWord();
		};
		
		this.rejectCurrentWord = function(){
			Events.trigger('game.wordrejected', currentWord);
			this.clearCurrentWord();
		};
		
		this.onTimeTick = function(){
			this.timeLeft = this.timeLeft - 1;
			infoPanel.updateTimer(this.timeLeft, this.timeLimit);
		};
		
		this.onLetterSelected = function(event, letter){
			currentWord.addLetter(letter);
			Events.trigger('game.wordupdated', currentWord);
		};
		
		this.onWordSubmitRequested = function(){
			if (Dictionary.check(currentWord.toString())){
				this.acceptCurrentWord();
			} else {
				this.rejectCurrentWord();
			}
		};
	};
	
	return Game;
	
});