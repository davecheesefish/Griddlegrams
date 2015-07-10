define(function($){
	
	/**
	 * Utility functions for common operations
	 */
	var Utils = {
		/**
		 * Bind a function to a specific context for use in event handlers.
		 */
		bindContext: function(func, context){
			return function(){
				func.apply(context, arguments);
			}
		}
	};
	
	return Utils;
});