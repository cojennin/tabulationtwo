var TabPreferences = {
	prefs: null,
		
	startup: function()
	{
		// Register to receive notifications of preference changes
		
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
				.getBranch("Tabulation.");
		this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this.prefs.addObserver("", this, false);

	},
	
	// Clean up after ourselves and save the prefs
	
	shutdown: function()
	{
		this.prefs.removeObserver("", this);
	},
	
	// Called when events occur on the preferences
	
	observe: function(subject, topic, data)
	{
		if (topic != "nsPref:changed")
		{
			return;
		}

	},	

}

// Install load and unload handlers

window.addEventListener("load", function(e) { Tabulation.startup(); }, false);
window.addEventListener("unload", function(e) { Tabulation.shutdown(); }, false);