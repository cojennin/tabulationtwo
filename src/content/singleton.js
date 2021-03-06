//Keep track of everything that's going on in the browser;
var page_tracker;
var track_if_opened = [];

//This is our session object
//It will maintain all knowledge on current browsers, pages, pageLoad events, pageClose events
function pageTracker(){
  //This will have to be merged with the tab tracker
  //***Someone could switch tabs and not re-load***
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
  /*for(url in browsers_open_with_session){
    curr_url = browsers_open_with_session[url];
    if (curr_url in tab_observer.pages_in_session) {
      var temp_tab_obj = tab_observer.pages_in_session[curr_url];
      temp_tab_obj.number_times_accessed_in_session += 1;

      var temp_avg_number_tabs_open = this.tabs_currently_opened[curr_url].avg_number_tabs_open_during_session;
      temp_avg_number_tabs_open.push(gBrowser.browsers.length);
      temp_tab_obj.avg_number_tabs_open_during_session = temp_avg_number_tabs_open;
    }
    else {
      tab_observer.pages_in_session[curr_url] = {
        id: url,
        number_times_accessed_in_session: 0,
        avg_number_tabs_open_during_session: [gBrowser.browsers.length]
      };
    }
  }*/
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

    /* Tab + page load check */
   /* if(!tab_observer.is_opening_tab){
      tab_observer.number_of_pages_viewed += 1;
    }
    else if(tab_observer.is_opening_tab && tab_observer.is_tab_selected_after_open){
      tab_observer.is_tab_selected_after_open = false;
      tab_observer.is_opening_tab = false
      tab_observer.number_of_pages_viewed += 1;

    }*/

    if(typeof page_tracker == 'undefined'){
      page_tracker = new pageTracker();
      page_tracker.addPage(win)
      loadOtherTabs(win.document.documentURI);
    }
    else{
      page_tracker.addPage(win);
      loadOtherTabs(win.document.documentURI);
    }
  }
}


window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    gBrowser.addEventListener("load", tabulationPageLoad, true); 
},false);



function loadOtherTabs(curr_url){

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.tabulation.");
      //prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
      //pref.setBoolPref("open_tabs_every_time", !(this.open_tabs_every_time));
  var should_always_open = prefs.getBoolPref("open_tabs_every_time");

  //Open tabs only once during a session
  if(should_always_open || track_if_opened.indexOf(curr_url) == -1){
    var all_tabs = tabulation_flat_table.readFromFile("tabulation_tab_store.json");
    var json_all_tabs;
    
    try{
      json_all_tabs = JSON.parse(all_tabs);
    }
    catch(e){
      json_all_tabs = {};
    }

    //In this session, have we already added links 
    //to be opened the next time this page is loaded?
    try{
      var temp_arry = json_all_tabs[curr_url];
      //Append links that already exist to listbox
      for(var link in temp_arry){
        gBrowser.addTab(temp_arry[link]);
      }
    }
    catch(e){}
  }
    this.track_if_opened.push(curr_url);
}
