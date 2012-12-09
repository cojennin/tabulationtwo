
try {
     var testComponent = Components.classes['@tabulationteam.org/tabulationhandler;1']
                                   .createInstance(Components.interfaces.nsITabulationHandler);
 	
 	var what_pref = testComponent.getWhenToOpenTabs();
   // window.addEventListener("load", function(e) { testComponent.startup(); }, false);
	//window.addEventListener("unload", function(e) { testComponent.shutdown(); }, false);
		var every_button = document.getElementById("tabulation-every");
		var once_button = document.getElementById("tabulation-once");
		if(what_pref){
			every_button.setAttribute("selected", "true");
			once_button.setAttribute("selected", "false");
		}
		else
		{
			once_button.setAttribute("selected", "true");
			every_button.setAttribute("selected", "false");
		}

} catch (anError) {
        alert(anError);
}