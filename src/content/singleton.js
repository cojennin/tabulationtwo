
//Keep track of everything that's going on in the browser;
var page_tracker;

//This is our session object
//It will maintain all knowledge on current browsers, pages, pageLoad events, pageClose events
function pageTracker(){
  this.how_many_tabs_opened = 0;
  //Keep all tabs that we're opened during this session.
  this.tabs_currently_opened = {}; 
  this.tabs_closed = {};
}

pageTracker.prototype.addPage = function(page_window){
  this.how_many_tabs_opened += 1;
  var browsers_open_with_session = pageTracker.getAllBrowserUrls();
  if (this.tabs_currently_opened[page_window.location.href] == "undefined") {
    this.tabs_currently_opened[page_window.location.href] = {
      "id": page_window.location.href,
      "number_times_accessed_in_session": 0,
      "number_tabs_open_with_in_session": gBrowsers.browsers.length
    }
  };
}

//We want to determine the pages open in this session
//Want to know the urls
//Also want to know how many times they have been opened/re-opened in this session
//The getAllBrowserUrls function needs to determine if we have or have not seen this url before
//If we have not, it adds the url to the currently_open_urls object as the name of an object,
//so something like currently_open_urls[b.currentURI.spec], with a total_count_opened property set to 0
//If we find this url again, find the object currently_open_urls[b.currentURI.spec] and add 1 to the
//total_count_opened property
pageTracker.prototype.getAllBrowserUrls = function(urls_already_registered){
  //The reasoning behind this code can be found:
  //https://developer.mozilla.org/en-US/docs/Code_snippets/Tabbed_browser
  var num = gBrowser.browsers.length;
  var currently_open_urls = {};
  for (var i = 0; i < num; i++) {
    var b = gBrowser.getBrowserAtIndex(i);
    try {

      dump(b.currentURI.spec); // dump URLs of all open tabs to console
    } catch(e) {
      Components.utils.reportError(e);
    }
  }  
}

function tabulationPageLoad(event) {
  if (event.originalTarget instanceof HTMLDocument) {
    var win = event.originalTarget.defaultView;
    //window.onbeforeunload = function(e){
    //  if(e){
    //      e.returnValue = "Test";
    //    }
    //};
    //If the tabTracker doesn't exist, create it
    //Else, add info to the page_tracker variable
    if (win.frameElement) {
      //Listen once to create tabTracker, then die
      return;
    }
    
    if(typeof page_tracker == 'undefined'){
      page_tracker = new pageTracker();
      page_tracker.addPage(win)
    }
    else{
      page_tracker.addPage(win);
    }
  }
}

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    gBrowser.addEventListener("load", tabulationPageLoad, true); 
},false);