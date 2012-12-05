

var tab_listener = new TabulationTabListener();

	function TabulationTabListener(){
		//Access gBrowser from within our sidebar
		var tabMainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        	.getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);

		var sidebar_h3 = $("#tabulation-doc-name");
		//alert(tabMainWindow.gBrowser.browsers.length);
		var title_of_page = document.title;
		//Title of page
		if(title_of_page){
			sidebar_h3.text(title_of_page);
		} else {
			sidebar_h3.text("Title could not be found");
			sidebar_h3.css('color', 'red');
		}
	}