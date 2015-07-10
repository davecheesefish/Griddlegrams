define(['jquery', 'app/events', 'app/utils', 'text!html/infopanel.html'], function($, Events, Utils, layout){
	InfoPanel = function(){
		//Private
		var $element = null;
		
		var $wordEl = null;
		var $wordScoreEl = null;
		
		//Privileged
		this.initialize = function(){
			Events.on('game.wordupdated', Utils.bindContext(this.onWordUpdated, this));
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
			
			return $element;
		};
		
		this.onWordUpdated = function(event, word){
			$wordEl.text(word.toString());
			$wordScoreEl.text(word.getPoints());
		};
		
		this.onWordCanceled = function(){
			$wordEl.empty();
			$wordScoreEl.text('0');
		}
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