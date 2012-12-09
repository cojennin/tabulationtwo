
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

function tabulationStartupService(){
  tabulationStartupService.prototype = {
    observe: function(subject, topic, data){
      switch(topic)
    }
  }
}