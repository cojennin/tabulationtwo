
try {
     var testComponent = Components.classes['@tabulationteam.org/tabulationhandler;1']
                                   .createInstance(Components.interfaces.nsITabulationHandler);
 	
    window.addEventListener("load", function(e) { testComponent.startup(); }, false);
	window.addEventListener("unload", function(e) { testComponent.shutdown(); }, false);

} catch (anError) {
        alert(anError);
}