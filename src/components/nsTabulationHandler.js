
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

/*var tabulation_prefs = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                      .getService(Components.interfaces.nsIPromptService);
*/

function TabulationHandler(){

	//this.wrappedJSObject = this;
}
/*
QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsITabulationHandler, 
											Components.interfaces.nsISupports]),
*/

//Not sure why we're overwriting the prototype...
//Also, not sure if we need specific getters/setters
//or should have some all encompassing "getPreferences"
//function which this component utilizes
TabulationHandler.prototype = {
	classDescription: "Tabulation handler XPCOM Component",

	classID: Components.ID("{5d2f9400-41c8-11e2-a25f-0800200c9a66}"),
	//contractID: "@tabulationteam.org/tabulationhandler;1",
	QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsITabulationHandler]),

	setOpenTabsEveryTime: function(){
		TabulationHandler.setOpenTabsEveryTime();
		return "Success";
	},

	setShowOpenAllTime: function(){
		TabulationHandler.getShowOpenAllTimeVar();
		return "Success";
	},	

	setShowClosedAllTime: function(){
		TabulationHandler.setShowClosedAllTimeVar();
		return "Success";
	},


	setShowSwitchedAllTime: function(){
		TabulationHandler.setShowSwitchedAllTimeVar();
		return "Success";
	},

	clearHistory: function(){
		TabulationHandler.clearHistory();
		return "Success";
	},

	test: function(){
		return "Hello";
	}
};

var components = [TabulationHandler];

if ("generateNSGetFactory" in XPCOMUtils)
  var NSGetFactory = XPCOMUtils.generateNSGetFactory(components);  // Firefox 4.0 and higher
else
  var NSGetModule = XPCOMUtils.generateNSGetModule(components);    // Firefox 3.x

/*
//Something to do with intializing the modules
//do not know if this it needed (think so though)

TabulationHandler.makePrefObserver = {

	startup: function() {
     // Register to receive notifications of preference changes
    	this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.tabulation.");
    	this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    	this.prefs.addObserver("", this, false);
      
      	//Utilize the getBoolPref function, which gets the bool value from there preference
      	//Documentation here: https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIPrefBranch#getBoolPref()
    	this.open_tabs_every_time = this.prefs.getBoolPref("open_tabs_every_time");     
   	},
   	
   	shutdown: function() {
    	this.prefs.removeObserver("", this);
	},

	observe: function(subject, topic, data) {
	     if (topic != "nsPref:changed")
	     {
	       return;
	     }

	     switch(data)
	     {
	       case "open_tabs_every_time":
	       		this.setOpenTabsEveryTime()
	         break;
	     }
	},
}

//Here we probably want to run all the getter methods
//Do we even need getter methods?

// For utilization of io.js, make sure this file loads AFTER IO.JS
 //IS LOADED IN THE PREFERENCES PANE
 
TabulationHandler.clearHistory = function(){
	//Find and delete the json file that stores our tab data
	//I AM U-571. DESTROY ME!
	//Actually, our json file should probs be given a preference name...
	//Come back to that in a bit
}

//Once again, the functions used in the setOpenTabsEveryTime
//function can be found here:https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIPrefBranch
TabulationHandler.setOpenTabsEveryTime = function(){
	//Store the opposite of our current preference
	this.prefs.setBoolPref("open_tabs_every_time", !(this.open_tabs_every_time));
}

// THESE WILL POSSIBLY BE IMPLEMENTED LATER, DO NOT LOOK BELOW
// THIS LINE FOR THE MOMENT
//-------------------------------------------------------------------
//

//TabulationHandler.getShowOpenAllTimeVar = function(){
//
//}

TabulationHandler.setShowOpenAllTimeVar = function(){

}

//TabulationHandler.getShowClosedAllTimeVar = function(){
//
//}

TabulationHandler.setShowClosedAllTimeVar = function(){

}

//TabulationHandler.getShowSwitchedAllTimeVar = function(){
//
//}

TabulationHandler.setShowSwitchedAllTimeVar = function(){

}
*/