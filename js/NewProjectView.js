var NewProjectView = function(project) {
	
	this.initialize = function() {
		this.colRows = 1;
		this.el = $('<div/>');
		this.el.on('click', '.spinner-item', this.changeSpinnerValue);
		this.el.on('click', '.input-radio-wrapper', this.changeRadioGroupValue);
		this.el.on('click', '#addnew', $.proxy(this.addCollRow, this));
		this.el.on('click', '#submit-action', this.createProject);
	};
	
	this.render = function() {
		this.el.html(NewProjectView.navTemplate() + NewProjectView.formTemplate() + NewProjectView.addColTemplate({collrow : this.colRows}));
		return this;
	};
	
	this.createProject = function() {
		var title = $("#input-title").val();
		var category = $("#category").val().trim();
		var group =  ($("#group").val()) === "true";
		var project = {title : title, category : category, type : group ? "Group" : "Private", sources : []};
		app.store.addObject(app.store.projects, project);
		console.log(app.store.projects);  
	};
	
	this.changeSpinnerValue = function(event) {
		var id = $(event.target).parent().parent().siblings(".toggle-spinner").attr("id");
		var category = $(this).text();
		$("#" + id).text(category);
		$("#category").val(category);  
	};
	
	this.changeRadioGroupValue = function() {
		var value = $(this).children(".input-radio").val();
		$("#group").val(value);
		var form = $("#coll-form");
		if(value === "true") {
			form.show();
		} else {
			form.hide();
		}
	};
	
	this.addCollRow = function(	) {
		this.colRows ++;
		$("#collaborators").append(NewProjectView.collRowTemplate({collrow : this.colRows}));
	};
	
	
	this.initialize();
};

NewProjectView.navTemplate = Handlebars.compile($("#new-project-nav-temp").html());
NewProjectView.formTemplate = Handlebars.compile($("#new-project-form-temp").html());
NewProjectView.addColTemplate = Handlebars.compile($("#new-project-add-coll-temp").html());
NewProjectView.collRowTemplate = Handlebars.compile($("#collaborator-row").html());
Handlebars.registerPartial("collrow", NewProjectView.collRowTemplate); 

