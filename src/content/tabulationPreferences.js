pref("browser.preferences.instantApply", true);
try {
    var testComponent = Components.classes['@tabulationteam.org/tabulationhandler;1']
                                   .createInstance(Components.interfaces.nsITabulationHandler);
 
    alert(testComponent.test());

} catch (anError) {
        alert(anError);
}