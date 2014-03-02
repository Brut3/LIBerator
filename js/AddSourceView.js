var AddSourceView = function(id, store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.selectable', this.toggleSelection);
		this.el.on('click', '#add-source-action', this.addSelectedSources);
	};
	
	this.render = function() {
		this.el.html(AddSourceView.navTemplate(id) + AddSourceView.sourceListTemplate(store));
		return this;
	};
	
	this.toggleSelection = function () {
		$(this).toggleClass("selected"); 
	};
	
	this.addSelectedSources = function () {
		var project = store.returnById(store.projects, parseInt(id.id), function(){});
		console.log(project);
		$(".selected").each(function(index) {
			project.sources.push({sourceId : $(this).data("id")});
		});
	};
	
	this.initialize();
};

Handlebars.registerHelper('library-source-item', function () {
  var source = this;
  var authors = "";
  for(var i=0,j=source.authors.length; i<j; i++){
    authors += source.authors[i].firstName.charAt(0) + ". " + source.authors[i].lastName + ", ";
  };
  return new Handlebars.SafeString(
  	"<li class=\"list-item-two-lines selectable\" data-id=\"" + source.id + "\">" + "<h3>" + 
  	source.title + "</h3>" + "<p>" + authors + "</p>" + "</li>"
  );
});

AddSourceView.navTemplate = Handlebars.compile($("#addsources-nav-temp").html());
AddSourceView.sourceListTemplate = Handlebars.compile($("#sources-li-temp").html());

