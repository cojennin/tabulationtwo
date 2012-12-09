
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

var tabulation_prefs = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                      .getService(Components.interfaces.nsIPromptService);


function TabulationHandler(){
	TabulationHandler.show_open_all_time = 1;
	TabulationHandler.show_closed_all_time = 1;
	TabulationHandler.show_switched_all_time = 1;
	TabulationHandler.limit_open_tabs = 1;
}

//Not sure why we're overwriting the prototype...
//Also, not sure if we need specific getters/setters
//or should have some all encompassing "getPreferences"
//function which this component utilizes
TabulationHandler.prototype = {
	classDescription: "Tabulation handler XPCOM Component",

	classID: Components.ID("{5d2f9400-41c8-11e2-a25f-0800200c9a66}"),
	contractID: "@mozilla.org/TabulationHandler;1",

	QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsITabulationHandler, 
											Components.interfaces.nsISupports]),

	getShowOpenAllTime: function(){
		TabulationHandler.getShowOpenAllTimeVar();
	},

	setShowOpenAllTime: function(){
		TabulationHandler.getShowOpenAllTimeVar();
	},

	getShowClosedAllTime: function(){
		TabulationHandler.getShowClosedAllTimeVar();
	},

	setShowClosedAllTime: function(){
		TabulationHandler.setShowClosedAllTimeVar();
	},

	getShowSwitchedAllTime: function(){
		TabulationHandler.getShowSwitchedAllTimeVar();
	},

	setShowSwitchedAllTime: function(){
		TabulationHandler.setShowSwitchedAllTimeVar();
	},

	clearHistory: function(){
		TabulationHandler.clearHistory();
	}
};


//Something to do with intializing the modules
//do not know if this it needed (think so though)

var components = [TabulationHandler];
if(XPCOMUtils.generateNSGetFactory)
	var NSGetFactory = XPCOMUtils.generateNSGetFactory(components);
else
 	var NSGetModule = XPCOMUtils.generateNSGetModule(components);

TabulationHandler.makePrefObserver = {

	startup: function() {
     // Register to receive notifications of preference changes
      
     this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.Tabularity.");
     this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
     this.prefs.addObserver("", this, false);
      
     //this.tickerSymbol = this.prefs.getCharPref("symbol").toUpperCase();
   	},
   	
   	shutdown: function() {
    	this.prefs.removeObserver("", this);
	},

	observe: function(subject, topic, data) {
	     if (topic != "nsPref:changed")
	     {
	       return;
	     }

	     FileTrayHandler.updateAllPrefs();
	  
	     /*switch(data)
	     {
	       case "symbol":
	         this.tickerSymbol = this.prefs.getCharPref("symbol").toUpperCase();
	         this.refreshInformation();
	         break;
	     }*/
	},
}

//Here we probably want to run all the getter methods
TabulationHandler.updateAllPrefs = function(){

}

TabulationHandler.getShowOpenAllTimeVar = function(){

}

TabulationHandler.setShowOpenAllTimeVar = function(){

}

TabulationHandler.getShowClosedAllTimeVar = function(){

}

TabulationHandler.setShowClosedAllTimeVar = function(){

}

TabulationHandler.getShowSwitchedAllTimeVar = function(){

}

TabulationHandler.setShowSwitchedAllTimeVar = function(){

}

TabulationHandler.clearHistory = function(){

}
