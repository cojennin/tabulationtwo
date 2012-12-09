
var mainDocWindow =  window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        	.getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);

var global_check = 0;

	function TabulationTabListener(mainWindow){
		//Access gBrowser from within our sidebar
			this.tabMainWindow = mainWindow;

        	this.tabulation_tabs = this.tabMainWindow.gBrowser.tabulation_observer;
        	this.curr_gBrowser = this.tabMainWindow.gBrowser;
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

	/*TabulationTabListener.prototype.logit = function(msg){
		this.tabMainWindow.console.log(msg);
	}*/

//Is a check needed here to see if tab_listener is defined?
var tab_listener = new TabulationTabListener(mainDocWindow);
tab_listener.updateDocTitle();
//tab_listener.currentlyOpenedTabs();
//tab_listener.updateNumTimesOpened();


/* Object for handling addition of tabs to list of tabs to pne
 * when opening url
 */

var tabListManager = {

	list_of_links: document.getElementById('tabulaton-link-list'), 

	manageTabsToOpen: function(){
		//See if jQuery support is available.
		//Get browser url for reference
		this.temp_g_browser = mainDocWindow.gBrowser;
		this.curr_url = mainDocWindow.gBrowser.contentDocument.documentURI;
		this.curr_links;
	},
	intializeLinksToDisplay: function(){

		var temp_links = document.getElementById('tabulaton-link-list')
		var count = temp_links.itemCount;
		
		var curr_browser = mainDocWindow.gBrowser;
		var curr_url = curr_browser.contentDocument.documentURI;

		var all_tabs = tabulation_flat_table.readFromFile("tabulation_tab_store.json");
		var json_all_tabs;
		try{
			json_all_tabs = JSON.parse(all_tabs);
		}
		catch(e){
			json_all_tabs = {};
		}

		//alert(json_all_tabs);
		//In this session, have we already added links 
		//to be opened the next time this page is loaded?
		try{
			//var temp_links_list = document.getElementById('tabulaton-link-list');
			var temp_arry = json_all_tabs[curr_url];
			//Append links that already exist to listbox
			var count = this.list_of_links.itemCount;
			while(count-- > 0){
				this.list_of_links.removeItemAt(0);
			}
			var i = 0;
			for(var link in temp_arry){
				this.list_of_links.insertItemAt(i, temp_arry[link], temp_arry[link])
				i++;
			}
		}
		catch(e){
			for(var link in temp_arry){
				this.list_of_links.appendItem(temp_arry[link], temp_arry[link])
			}
		}
	},
	addLinkToList: function(){
		//Check if anything is in the input field
		var link_to_add = document.getElementById('tabulation-link-to-add');
		if(link_to_add.value.trim() == ""){
			return false;
		}
		this.list_of_links.appendItem(link_to_add.value, link_to_add.value);
		link_to_add.value = "";
	},
	removeLinkFromList: function(){
		var count = this.list_of_links.selectedCount;
		while (count--){
			var item = this.list_of_links.selectedItems[0];
		    this.list_of_links.removeItemAt(this.list_of_links.getIndexOfItem(item));
		}
	},
	addAllLinksFromOpenBrowsers: function(){
		var curr_browser = mainDocWindow.gBrowser;
		var num = curr_browser.browsers.length;

	  	for (var i = 0; i < num; i++) {
	    	var b_urls = curr_browser.getBrowserAtIndex(i);
	    	try {
	      		//Loop through all open windows and push them to this array
	      		this.list_of_links.appendItem(b_urls.currentURI.spec, b_urls.currentURI.spec);
	    	} catch(e) {
	      		Components.utils.reportError(e);
	    	}
	  	}
	},
	saveAllLinksInList: function(){
		var curr_browser = mainDocWindow.gBrowser;
		var curr_url = curr_browser.contentDocument.documentURI;
		var count = this.list_of_links.itemCount;
		//Storge json like objects in local storage with the key being
		//the url they're stored under.
		
		var all_tabs = tabulation_flat_table.readFromFile("tabulation_tab_store.json");
		var json_all_tabs;
		try{
			json_all_tabs = JSON.parse(all_tabs);
		}
		catch(e){
			json_all_tabs = {};
		}

		if(typeof json_all_tabs[curr_url] == "undefined"){
			json_all_tabs[curr_url] = [];
		}

		for(var i = 0; i < count; i++){
			json_all_tabs[curr_url][i] = this.list_of_links.getItemAtIndex(i).value;
		}

		tabulation_flat_table.writeToFile("tabulation_tab_store.json", JSON.stringify(json_all_tabs));
	}
}

tabListManager.intializeLinksToDisplay();