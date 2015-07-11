define(['jquery', 'app/events', 'app/utils', 'text!html/infopanel.html'], function($, Events, Utils, layout){
	InfoPanel = function(){
		//Private
		var $element = null;
		
		var $wordEl = null;
		var $wordScoreEl = null;
		var $scoreEl = null;
		
		//Privileged
		this.initialize = function(){
			Events.on('game.wordupdated', Utils.bindContext(this.onWordUpdated, this));
			Events.on('game.wordcleared', Utils.bindContext(this.onWordCleared, this));
			Events.on('game.scoreupdated', Utils.bindContext(this.onScoreUpdated, this));
		};
		
		this.updateTimer = function(timeLeft, timeLimit){
			var $timerEl = $('#timer');
			var $timerBar = $('span', $timerEl)
			$timerBar.text(this.formatTime(timeLeft));
			$timerBar.width((100 * (1 - timeLeft/timeLimit)) + '%');
		};
		
		this.render = function(){
			$element = $(layout);
			$wordEl = $('#current-word .word', $element);
			$wordScoreEl = $('#current-word .points', $element);
			$scoreEl = $('#score', $element);
			
			$('#submit-word', $element).click(function(){ Events.trigger('game.wordsubmitrequested'); });
			$('#clear-word', $element).click(function(){ Events.trigger('game.wordclearrequested'); });
			
			return $element;
		};
		
		this.onWordUpdated = function(event, word){
			$wordEl.text(word.toString());
			$wordScoreEl.text(word.getPoints());
		};
		
		this.onWordCleared = function(){
			$wordEl.text('-');
			$wordScoreEl.text('0');
		};
		
		this.onScoreUpdated = function(event, change, score){
			$scoreEl.text(score);
		};
	};
	
	InfoPanel.prototype.formatTime = function(secs){
		var m = Math.floor(secs/60);
		var s = secs - m*60;
		
		if (s < 10)
			{ s = '0' + s; }
		
		return m + ':' + s;
	};
	
	return InfoPanel;
});