
var tab_tracker;

if(typeof tab_tracker == "undefined"){
	tab_tracker = new tabTracker();
	var tabulation_tabs = gBrowser.tabContainer;
	//In order for the callbacks to work, have inlined
	//the function and made the call to tab_tracker explicitly
	//Not sure if there is a better way to accomplish this
	tabulation_tabs.addEventListener("TabSelect", function(e){tab_tracker.updateTabsChanged(e);}, false);
	tabulation_tabs.addEventListener("TabOpen", function(e){tab_tracker.updateTabsOpened(e);}, false);
	tabulation_tabs.addEventListener("TabClose", function(e){tab_tracker.updateTabsClosed(e);}, false)
	
	//Mail our data over to the sidebar
	//gBrowser seems like a good universal way to share objects
	//Possible better ideas?
	if(typeof gBrowser.tabulation_tab_object == 'undefined'){	
    	gBrowser.tabulation_tab_object = this;    
  	}
}

//The creation of the tabTracker fires before the creation of the pageLoad event
function tabTracker(){
	//These are all independent of page load, but the
	//how_many_pages_viewed_in_this_session will rely on the switch
	//and new events
	this.already_opened_or_closed = false;
}

/* Mainly setter functions for our variables. Could inline, but 
 * not sure if they'll be used later on. Leaving them as standalone 
 * for the moment.
 */


//This event will trigger sometimes on open and close
//When an explicity click on the tab creation button occurs
//or a click on File->New Tab, this event will trigger
//But, the open and close events occur before this event
//Therefore, need a constant to determine if the updateTabsChanged event should occur
//if the open/close events have already occured
tabTracker.prototype.updateTabsChanged = function(event){
	tab_observer.total_number_of_times_tab_has_been_switched += 1;
	tab_observer.is_tab_selected_after_open = true;
	var sidebarWindow = document.getElementById("sidebar").contentWindow;
	if (sidebarWindow.location.href == "chrome://tabularity/content/tab-window.xul") {
		toggleSidebar();
    }
}

tabTracker.prototype.updateTabsOpened = function(event){
	tab_observer.total_number_of_tabs_opened_during_session += 1;
	tab_observer.is_opening_tab = true;
	var sidebarWindow = document.getElementById("sidebar").contentWindow;
	if (sidebarWindow.location.href == "chrome://tabularity/content/tab-window.xul") {
		toggleSidebar();
    }
}

tabTracker.prototype.updateTabsClosed = function(event){
	tab_observer.total_number_of_tabs_closed_during_session += 1;
}