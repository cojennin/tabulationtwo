try {
        var myComponent = Components.classes['@tabulationteam.org/TabulationHandler;1']
                                    .createInstance(Components.interfaces.nsITabulation);
} catch (anError) {
        dump("ERROR: " + anError);
}