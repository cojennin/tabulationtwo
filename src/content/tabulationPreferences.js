try {
        var tabulationComponent = Components.classes['@tabulationteam.org/TabulationHandler;1']
                                    .createInstance(Components.interfaces.nsITabulation);


        tabulationComponent.test();
        
        window.addEventListener("load", function(e) { tabulationComponent.makePrefObserver.startup(); }, false);
		window.addEventListener("unload", function(e) { tabulationComponent.makePrefObserver.shutdown(); }, false);

} catch (anError) {
        dump("ERROR: " + anError);
}