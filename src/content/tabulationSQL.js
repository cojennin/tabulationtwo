/* SQLite management */
Components.utils.import("resource://gre/modules/NetUtil.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var tabulation_flat_table;
if(tabulation_flat_table == "undefined"){
	tabulation_flat_table = {
		this.file_name: "tabulation_flat_table.txt",
		this.tabulation_file: "",
		initialize: function(){
			this.tabulation_file = DirIO.open("ProfD");
			if (dir.exists()) {
				this.tabulation_file.append("extensions"); // extensions subfolder of profile directory
				try{
					this.tabulation_file.append("{ec8030f7-c20a-464f-9b0e-13a3a9e97384}");
				}
				catch(e){
					alert("Could not locate extension directory.");
				}
				this.tabulation_file.append("tabulation_flat.json");
			}
			else
			{
				alert("Could not locate preferences directory.")
				return false;
			}
		},
		writeToFile: function(json_str){
			FileIO.write(this.tabulation_file, JSON.stringify(json_str));
		},
		readFromFile: function(){
			var fileContents = FileIO.read(this.tabulation_file);
			return tabulation_json = JSON.parse(fileContents);
		}
	}

	tabulation_flat_tabl.initialize();
}