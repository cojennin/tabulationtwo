
//$(document).ready(function(){
	var tab_listener = new TabulationTabListener();
	//var tab_browser = gBrowser;
	
	//console.log(tab_browser);

		function TabulationTabListener(){
			var sidebar_h3 = $("#tabulation-doc-name");
			if(document.title){
				sidebar_h3.text(document.title);
				console.log(sidebar_h3.html());
			}
			else{
				sidebar_h3.text("Test test test \ntest test test \n test test");
				console.log(sidebar_h3.html());
			}
		}
//});