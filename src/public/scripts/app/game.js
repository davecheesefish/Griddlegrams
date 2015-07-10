define(['jquery', 'app/events', 'app/utils', 'app/word', 'app/lettergrid', 'app/infopanel', 'text!html/game.html'], function($, Events, Utils, Word, LetterGrid, InfoPanel, layout){
	
	var Game = function($element){
		// Private
		var letterGrid = null;
		var infoPanel = null;
		
		var timerInterval = null;
		var currentWord = null;
		var currentWordScore = 0;
		
		//Public
		this.timeLimit = 300;
		this.timeLeft = this.timeLimit;
		
		// Privileged
		this.initialize = function(){
			letterGrid = new LetterGrid();
			letterGrid.generate();
			
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
		};
		
		this.render = function(){
			$element = $(layout);
			$element.append(letterGrid.render());
			$element.append(infoPanel.render());
			return $element;
		};
		
		this.clearCurrentWord = function(){
			currentWord = new Word();
			Events.trigger('game.wordcanceled');
		};
		
		this.onTimeTick = function(){
			this.timeLeft = this.timeLeft - 1;
			infoPanel.updateTimer(this.timeLeft, this.timeLimit);
		};
		
		this.onLetterSelected = function(event, letter){
			currentWord.addLetter(letter);
			Events.trigger('game.wordupdated', [currentWord]);
		};
	};
	
	return Game;
	
});