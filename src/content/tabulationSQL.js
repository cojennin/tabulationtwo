/* SQLite management */
Components.utils.import("resource://gre/modules/NetUtil.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var tabulation_flat_table;
if(tabulation_flat_table == "undefined"){
	tabulation_flat_table = {
		this.file_name: "tabulation_flat_table.txt",
		this.tabulation_file_path: "",
		initialize: function(){
			var dir = DirIO.open("ProfD");
			if (dir.exists()) {
				file.append("extensions"); // extensions subfolder of profile directory
				file.append("{ec8030f7-c20a-464f-9b0e-13a3a9e97384}");
			}
		},
		writeToFile: function(){
			Components.utils.import("resource://gre/modules/FileUtils.jsm");

			var stream = FileOutputStream.openFileOutputStream(this.tabulation_file_path, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE);
			stream.write(data, data.length);
			stream.close();

		},
		readFromFile: function(){
			var file = prefs.getComplexValue(this.file_name, Components.interfaces.nsILocalFile);
			Components.utils.import("resource://gre/modules/NetUtil.jsm");
			NetUtil.asyncFetch(file, function(inputStream, status) {
			  if (!Components.isSuccessCode(status)) {
			    alert("Error reading table.");
			    return;
			  }
			  // The file data is contained within inputStream.
			  // You can read it into a string with
			  var data = NetUtil.readInputStreamToString(inputStream, inputStream.available());
			});
		}
	}
}