

	function TabulationTabListener(){
		//Access gBrowser from within our sidebar
		this.tabMainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        	.getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);

        	this.tabulation_tabs = this.tabMainWindow.gBrowser.tabulation_page_object;
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
			curr_opened_tabs.text(" " + this.tabulation_tabs.how_many_tabs_opened_in_this_session.toString());
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

var tab_listener = new TabulationTabListener();
tab_listener.updateDocTitle();
tab_listener.currentlyOpenedTabs();
tab_listener.updateNumTimesOpened();