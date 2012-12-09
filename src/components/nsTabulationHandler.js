
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

var tabulation_prefs = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                      .getService(Components.interfaces.nsIPromptService);


function TabulationHandler(){
	TabulationHandler.show_open_all_time = 1;
	TabulationHandler.show_closed_all_time = 1;
	TabulationHandler.show_switched_all_time = 1;
	TabulationHandler.limit_open_tabs = 1;
	TabulationHandler.open_tabs_every_time = 0;
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

	getOpenTabsEveryTime: function(){
		TabulationHandler.getOpenTabsEveryTime();
	},

	setOpenTabsEveryTime: function(){
		TabulationHandler.setOpenTabsEveryTime();
	},

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

/* For utilization of io.js, make sure this file loads AFTER IO.JS
 * IS LOADED IN THE PREFERENCES PANE
 */
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

/* THESE WILL POSSIBLY BE IMPLEMENTED LATER, DO NOT LOOK BELOW
 * THIS LINE FOR THE MOMENT
-------------------------------------------------------------------
*/

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
