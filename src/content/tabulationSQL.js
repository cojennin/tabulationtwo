/* SQLite management */
Components.utils.import("resource://gre/modules/NetUtil.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");


var tabulation_flat_table = {
		initialize: function(file_name){
			var dir = DirIO.get("ProfD");

			if (dir.exists()) {
				this.tabulation_file = dir;
				this.tabulation_file.append("extensions"); // extensions subfolder of profile directory
				try{
					this.tabulation_file.append("tabulation");
				}
				catch(e){
					alert("Could not locate extension directory.");
				}
				this.tabulation_file.append(file_name);

				if(!this.tabulation_file.exists()){
					if(!FileIO.create(this.tabulation_file)){
					    throw Error("Failed to create earnings backup file");
					}
				}
			}
			else
			{
				alert("Could not locate preferences directory.")
				return false;
			}
		},
		writeToFile: function(file_name, str_to_write){
			this.initialize(file_name);
			var failed = FileIO.write(this.tabulation_file, str_to_write);
		},
		readFromFile: function(file_name){
			this.initialize(file_name);
			var file_contents = FileIO.read(this.tabulation_file);
			return file_contents;
		}
	}