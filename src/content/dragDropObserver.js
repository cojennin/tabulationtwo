//This is unused. With more time, would like to add
//drag drop functionality to program
var drop_elem = document.getElementById('drop-on-me');
drop_elem.addEventListener("dragdrop", onDrop, true);

function onDrop(event) {
	var data = event.dataTransfer.getData("text/plain");
  	event.target.textContent = data;
  	event.preventDefault();
}
