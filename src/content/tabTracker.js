
var tab_tracker;

if(typeof tab_tracker == "undefined"){
	tab_tracker = new tabTracker();
	var tabulation_tabs = gBrowser.tabContainer;
	tabulation_tabs.addEventListener("TabSelect", tab_tracker.updateTabsChanged, false);
	tabulation_tabs.addEventListener("TabOpen", tab_tracker.updateTabsOpened, false);
	tabulation_tabs.addEventListener("TabClose", tab_tracker.updateTabsClosed, false)
	
	//Mail our data over to the sidebar
	//gBrowser seems like a good universal way to share objects
	//Possible better ideas?
	if(typeof gBrowser.tabulation_tab_object == 'undefined'){	
    	gBrowser.tabulation_tab_object = this;    
  	}
}

//Does this event fire on firefox (prior to page load?)?
//At the moment, 
function tabTracker(){
	alert("tabEvent")
	//These are all independent of page load, but the
	//how_many_pages_viewed_in_this_session will rely on the switch
	//and new events
	this.total_number_of_tabs_opened_during_session = 0;
	this.total_number_of_tabs_closed_during_session = 0;
	this.total_number_of_times_tab_has_been_switched = 0;
}

/* Mainly setter functions for our variables. Could inline, but 
 * not sure if they'll be used later on. Leaving them as standalone 
 * for the moment.
 */
tabTracker.prototype.updateTabsChanged = function(event){
	this.total_number_of_times_tab_has_been_switched += 1;
}

tabTracker.prototype.updateTabsOpened = function(event){
	this.total_number_of_tabs_closed_during_session += 1;
}

tabTracker.prototype.updateTabsClosed = function(event){
	this.total_number_of_tabs_closed_during_session += 1;
}