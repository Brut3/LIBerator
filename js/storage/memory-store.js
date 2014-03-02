var MemoryStore = function(successCallback, errorCallback) {

	this.findByTitle = function(dataSet, searchKey, callback) {
		var results = dataSet.filter(function(element) {
			return element.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
		});
		asyncCall(callback, results);
	};

	this.findById = function(dataSet, id, callback) {
		var data = dataSet;
		var result = null;
		var l = dataSet.length;
		for (var i = 0; i < l; i++) {
			if (data[i].id === id) {
				result = data[i];
				break;
			}
		}
		asyncCall(callback, result);
	};
	
	this.returnById = function(dataSet, id, callback) {
		var data = dataSet;
		var result = null;
		var l = dataSet.length;
		for (var i = 0; i < l; i++) {
			if (data[i].id === id) {
				result = data[i];
				break;
			}
		}
		return result;
	};
	
	this.addObject = function(dataSet, obj) {
		if($.isArray(dataSet)) {
			obj.id = dataSet[dataSet.length-1].id++;
			dataSet.push(obj);			
		}
	};

	// Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
	// that use async data access APIs
	var asyncCall = function(callback, data) {
		if (callback) {
			setTimeout(function() {
				callback(data);
			});
		}
	};

	this.projects = [{
		id : 1,
		title : "The Art of War - Implications for the modern warfare",
		category : "Essay",
		type : "Private",
		sources : []
	}, {
		id : 2,
		title : "Improving design productivity with agile methods.",
		category : "Report",
		type : "Group",
		sources : [{sourceId : 2}, {sourceId : 3}]
	}, {
		id : 3,
		title : "Sequence requirements for micro RNA processing and function in human cells",
		category : "White paper",
		type : "Private",
		sources : []
	}, {
		id : 4,
		title : "The coming crisis of empirical sociology",
		category : "Essay",
		type : "Private",
		sources : []
	}, {
		id : 5,
		title : "Anarchy is what states make of it: the social construction of power politics",
		category : "Dissertation",
		type : "Private",
		sources : []
	}, {
		id : 6,
		title : "Cinema and sensation: French film and the art of transgression",
		category : "Unknown",
		type : "Group",
		sources : []
	}];

	this.resources = [{
		id : 1,
		title : "The Art of War",
		authors : [{
			firstName: "Sun",
			lastName: "Tzu" 
		}],
		category : "Book",
		fileid : 1
	},{
		id : 2,
		title : "Agile Manifesto",
		authors : [{
			firstName: "Kent",
			lastName: "Beck" 
		},{
			firstName: "Mike",
			lastName: "Beedle" 
		},{
			firstName: "Arie",
			lastName: "van Bennekum" 
		}],
		category : "Web site",
		url : "http://agilemanifesto.org/"
	},{
		id : 3,
		title : "The Mythical Man Month",
		authors : [{
			firstName : "Fred",
			lastName : "Brooks" 
		}],
		category : "Vook",
		fileid : 2
	}];
	
	this.users = [];
	
	this.files = [{
		id : 1,
		name : "art_of_war.epub",
		size : 148,
	}];
	
	asyncCall(successCallback);

}; 