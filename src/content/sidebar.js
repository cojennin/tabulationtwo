
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

var tabListManager;
if(tabListManager == "undefined"){
	tabListManager = {};
}

tabListManager = {

	list_of_links: document.getElementById('tabulaton-link-list'), 

	manageTabsToOpen: function(){
		//See if jQuery support is available.
		//Get browser url for reference
		this.temp_g_browser = this.mainDocWindow.gBrowser;
		this.curr_url = contentDocument.URL;
		this.curr_links;
	},
	intializeLinksToDisplay: function(){
		
		var curr_browser = this.mainDocWindow.gBrowser;
		var links_retrieved = JSON.parse(localStorage.getItem(curr_browser.documentURI));
		//In this session, have we already added links 
		//to be opened the next time this page is loaded?
		if(links_retrieved){
			//Append links that already exist to listbox
			for(var link in links_retrieved){
				this.list_of_links.appendItem(links_retrieved[link], links_retrieved[link]);
			}
		}
	},
	addLinkToList: function(){
		//Check if anything is in the input field
		var link_to_add = document.getElementById('tabulation-link-to-add');
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
		var array_to_json = [];
	
		for(var i = 0; i < count; i++){
			array_to_json.push(this.list_of_links.getItemAtIndex(i));
		}

		localStorage.setItem(curr_url, JSON.stringify(array_to_json));
	}
}