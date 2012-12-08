
var mainDocWindow =  window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        	.getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);



	function TabulationTabListener(mainWindow){
		//Access gBrowser from within our sidebar
		this.tabMainWindow = mainWindow;

        	this.tabulation_tabs = this.tabMainWindow.gBrowser.tabulation_observer;
        	this.curr_gBrowser = this.tabMainWindow.gBrowser;
	}

	TabulationTabListener.prototype.logit = function(msg){
		var doc_window = this.tabMainWindow;
		doc_window.console.log(msg);
	}

	TabulationTabListener.prototype.updateDocTitle = function(){
		var sidebar_h3 = $("#tabulation-doc-name");
		var title_of_page = this.tabMainWindow.gBrowser.contentDocument.title;
		if(title_of_page){
			sidebar_h3.text(title_of_page);
		} else {
			sidebar_h3.text("Title could not be found");
			sidebar_h3.css('color', 'red');
		}
	}

	TabulationTabListener.prototype.currentlyOpenedTabs = function(){
		//If undefined, null, etc, it means we've just opened the browser
		//For now, set to 0, but eventually will need to check on browser load event tog et
		//accurate count of all browsers. Also will need to update on browser change
		var curr_opened_tabs = $('#currently-opened-tabs');
		if(this.tabulation_tabs.how_many_tabs_opened_in_this_session)
			curr_opened_tabs.text(" " + this.tabulation_tabs.total_number_of_tabs_opened_during_session);
		else
			curr_opened_tabs.text(" 0");
	}

	TabulationTabListener.prototype.updateNumTimesOpened = function(){
		var current_url = this.tabMainWindow.gBrowser.contentDocument.URL;
		var times_accessed = this.tabulation_tabs.tabs_currently_opened[current_url].number_times_accessed_in_session;
		$('#num-times-opened').text(" "+times_accessed.toString());
	}

	TabulationTabListener.prototype.logit = function(msg){
		this.tabMainWindow.console.log(msg);
	}

//Is a check needed here to see if tab_listener is defined?
var tab_listener = new TabulationTabListener(mainDocWindow);
tab_listener.updateDocTitle();
tab_listener.currentlyOpenedTabs();
tab_listener.updateNumTimesOpened();

if(in_session_links == "undefined")
	var in_session_links = {};

//See if jQuery support is available.
$(document).ready(function(){
	//Get browser url for reference
	var temp_g_browser = this.mainDocWindow.gBrowser;
	var curr_url = contentDocument.URL;
	var curr_links;

	//In this session, have we already added links 
	//to be opened the next time this page is loaded?
	if(curr_url in in_session_links)
		curr_links = session_links[curr_url];
	else
		curr_links = [];

	var list_of_links = mainDocWindow.getElementById('tabulaton-link-list');

	//Append links that already exist to listbox
	for(var link in curr_links){
		list_of_links.appendItem(curr_links[link], curr_links[link]);
	}

	$('#tabulation-link-to-add').click(function(){
		//Check if anything is in the input field
		var link_to_add = $('#tabulation-add-link-button').text();
		//If we have text
		if(link_to_add){
			//If it doesn't already exist in our list
			if(!curr_links[link_to_add]){
				list_of_links.appendItem(link_to_add, link_to_add);
				curr_links.push(link_to_add);
			}
		}
	});
}
