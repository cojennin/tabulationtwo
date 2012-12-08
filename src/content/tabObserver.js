
var tab_observer;

if(typeof tab_observer == "undefined"){
	tab_observer = new tabObserver();

	if(typeof gBrowser.tabulation_tab_object == 'undefined'){	
    	gBrowser.tabulation_observer = this;    
  	}
}

function tabObserver(){
	this.number_of_tabs_opened = 0;
	this.number_of_pages_viewed = 0;

	this.selection_has_occured = false;

	//For working with tab class:
	this.total_number_of_tabs_opened_during_session = 0;
	this.total_number_of_tabs_closed_during_session = 0;
	this.total_number_of_times_tab_has_been_switched = 0;

	//For working with page class:
}

