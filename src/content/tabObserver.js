
var tab_observer;

if(typeof tab_observer == "undefined"){
	tab_observer = new tabObserver();

	if(typeof gBrowser.tabulation_tab_object == 'undefined'){	
    	gBrowser.tabulation_observer = this;    
  	}
}

function tabObserver(){
	this.number_of_tabs_opened_all_time = 0;
	this.number_of_pages_viewed = 0;

	this.pages_in_session = {}

	//These are for keeping track of page views
	this.is_opening_tab = false;
	this.is_tab_selected_after_open = false;

	//For working with tab class:
   
	this.total_number_of_tabs_opened_during_session = 0;
	this.total_number_of_tabs_closed_during_session = 0;
	this.total_number_of_times_tab_has_been_switched = 0;

	//For working with page class:
}

