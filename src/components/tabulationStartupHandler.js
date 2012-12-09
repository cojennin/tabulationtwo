
/* The following code handles application startup. This is useful for situations when firefox crashes
 * or is force-quit(ted?) by the user. When that occurs, firefox will load the pages it previously handles
 * out of some sort of cache. This means the window.load event will not trigger for the first tab. Other 
 * tabs will trigger (firefox auto-refreshes tabs when selecting them after a forced startup, probably an effort)
 * to refresh cache
*/
//See some background on the code here: https://developer.mozilla.org/en-US/docs/Code_snippets/Miscellaneous

//If firefox components are needed further up this script at a later date, 
//make sure to MOVE OR DELETE ME

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

tabulationStartupObserver = Components.classes['@mozilla.org/observer-service;1'].getService(Components.interfaces.nsIObserverService);

//Testing the wrappedJSObject dealio
//THIS MAY BE NEEDED LATER CAUSE ITS LOOKING TO DO BOOTUP RELATED STUFF
//QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsIObserver])
function tabulationStartupService(){
this.wrappedJSObject = this;
}

tabulationStartupService.prototype.test = function(){
	alert("test");
}
  tabulationStartupService.prototype = {
    observe: function(subject, topic, data){
      switch(topic) {
      	//Latest possible time to startup, 
      	//gBrowser should be available at this moment...?
      	case "final-ui-startup":
      		this.init();
      	break;
      }
    },
  init: function(){
  	//Test to see if gBrowser exists before final-ui-startup
  	alert(gBrowser.browsers.length);
  },
  
  lassDescription: "Taulation Startup",
  contractID: "@mozilla.org/tab-startup;2",
  classID: Components.ID("{86c8d97f-70c2-4849-ad44-c299fb1a093d}"),
    _xpcom_categories: [{
        category: "app-startup",
        service: true
    }]
}
 
function NSGetModule(compMgr, fileSpec) {
    return XPCOMUtils.generateModule([tabulationStartupService]);
}