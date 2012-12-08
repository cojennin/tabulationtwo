//Keep track of everything that's going on in the browser;
var page_tracker;

//This is our session object
//It will maintain all knowledge on current browsers, pages, pageLoad events, pageClose events
function pageTracker(){
  //This will have to be merged with the tab tracker
  //***Someone could switch tabs and not re-load***
  this.how_many_pages_viewed_in_this_session = 0;
  //Keep all tabs that we're opened during this session.
  this.tabs_currently_opened = {}; 
  this.tabs_closed = {};

  //Attach this js object to gBrowser for use in sidebar
  if(typeof gBrowser.tabulation_page_object == 'undefined'){
    gBrowser.tabulation_page_object = this;    
  }
}

pageTracker.prototype.addPage = function(page_window){

  //An array of urls
  var browsers_open_with_session = this.getAllBrowserUrls();
  var url;
  var curr_url;
  for(url in browsers_open_with_session){
    curr_url = browsers_open_with_session[url];
    if (curr_url in this.tabs_currently_opened) {
      var temp_tab_obj = this.tabs_currently_opened[curr_url];
      temp_tab_obj.number_times_accessed_in_session += 1;

      var temp_avg_number_tabs_open = this.tabs_currently_opened[curr_url].avg_number_tabs_open_during_session;
      temp_avg_number_tabs_open.push(gBrowser.browsers.length);
      temp_tab_obj.avg_number_tabs_open_during_session = temp_avg_number_tabs_open;
    }
    else {
      this.tabs_currently_opened[curr_url] = {
        id: url,
        number_times_accessed_in_session: 0,
        avg_number_tabs_open_during_session: [gBrowser.browsers.length]
      };
    }
  }
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
  var currently_open_urls = []
  for (var i = 0; i < num; i++) {
    var b_urls = gBrowser.getBrowserAtIndex(i);
    try {
      //Loop through all open windows and push them to this array
      currently_open_urls.push(b_urls.currentURI.spec)

    } catch(e) {
      Components.utils.reportError(e);
    }
  }
  return currently_open_urls;  
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
    alert("pageEvent");
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
