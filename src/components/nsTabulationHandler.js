
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");


/*var tabulation_prefs = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                      .getService(Components.interfaces.nsIPromptService);
*/

function TabulationHandler(){
	//this.makePrefObserver = {}
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
		pref.setBoolPref("open_tabs_every_time", !(this.open_tabs_every_time));
		alert("test");
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
		try{
			var file = Components.classes["@mozilla.org/file/directory_service;1"].
	           getService(Components.interfaces.nsIProperties).
	           get("ProfD", Components.interfaces.nsIFile);
	           
	           //O dear lord this is all hardcoded
	           file.append("extensions");
	           file.append("tabulation");
	           file.append("tabulation_tab_store.json")
	           file.remove(true);
	           return "Success";
			//return will_this_work;
		} catch(e){
			return "Error";
		}
	},

	test: function(){
		return "Hello";
	},

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
	       		this.setOpenTabsEveryTime(this.prefs)
	         break;
	     }
	}
};

var components = [TabulationHandler];

if ("generateNSGetFactory" in XPCOMUtils)
  var NSGetFactory = XPCOMUtils.generateNSGetFactory(components);  // Firefox 4.0 and higher
else
  var NSGetModule = XPCOMUtils.generateNSGetModule(components);    // Firefox 3.x


//Something to do with intializing the modules
//do not know if this it needed (think so though)

//TabulationHandler.makePrefObserver = {
//}
	/*test: function(){
		alert("test");
	}.

	startup: function() {
		alert("Test");
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
	     alert("encounteredPrefChange");
	     switch(data)
	     {
	       case "open_tabs_every_time":
	       		TabulationHandler.setOpenTabsEveryTime(this.prefs)
	         break;
	     }
	},
};

TabulationHandler.prototype.setOpenTabsEveryTimeVar = function(pref){
	alert("test");
	pref.setBoolPref("open_tabs_every_time", !(this.open_tabs_every_time));
}

//Here we probably want to run all the getter methods
//Do we even need getter methods?

// For utilization of io.js, make sure this file loads AFTER IO.JS
 //IS LOADED IN THE PREFERENCES PANE
 /*
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