var app = {

	initialize : function() {
		var self = this;
		this.projectURL = /^#project\/(\d{1,})/;
		self.registerEvents();
		this.store = new MemoryStore(function() {
			self.route();
		});
	},

	registerEvents : function() {
		var self = this;
		$(window).on('hashchange', $.proxy(this.route, this));
		// Check of browser supports touch events...
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		}
	},

	route : function() {
		console.log("Routing!");
		var self = this;
		var hash = window.location.hash;
		if (!hash) {
			if (this.homePage) {
				console.log("Home page!");
				this.slidePage(this.homePage);
			} else {
				console.log("New home page!");
				this.homePage = new ProjectsView(this.store).render();
				this.slidePage(this.homePage);
			}
			return;
		}
		console.log(this.projectURL);
		var match = hash.match(this.projectURL);
		console.log(match);
		if (match) {
			self.store.findById(self.store.projects, Number(match[1]), function(project) {
				console.log("Rendering Project." + project.title);
				self.slidePage(new ProjectView(project).render());
			});
		}
		
	},

	slidePage : function(page) {

		var currentPageDest, self = this;

		// If there is no current page (app just started) -> No transition: Position new page in the view port
		if (!this.currentPage) {
			$(page.el).attr('class', 'page stage-center').attr('id', 'homePage');
			$('body').append(page.el);
			this.currentPage = page;	
			return;
		}

		// Cleaning up: remove old pages that were moved out of the viewport
		$('.stage-right, .stage-left').not('#homePage').remove();

		if (page === app.homePage) {
			// Always apply a Back transition (slide from left) when we go back to the search page
			$(page.el).attr('class', 'page stage-left');
			currentPageDest = "stage-right";
		} else {
			// Forward transition (slide from right)
			$(page.el).attr('class', 'page stage-right');
			currentPageDest = "stage-left";
		}

		$('body').append(page.el);

		// Wait until the new page has been added to the DOM...
		setTimeout(function() {
			// Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
			$(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
			// Slide in the new page
			$(page.el).attr('class', 'page stage-center transition');
			self.currentPage = page;
		});

	},
};

app.initialize();

(function () {
  var init = function () {
    // Make sure the dialog is in the DOM
    if (document.querySelector('#my-dialog')) {
      var dialog = new fries.Dialog({
        selector: '#my-dialog',
        callbackOk: function () {
          var toast = new fries.Toast({
            content: "Pressed OK",
            duration: fries.Toast.duration.SHORT
          });

          this.hide(); // this refers to the dialog
        },
        callbackCancel: function () {
          var toast = new fries.Toast({
            content: "Pressed Cancel",
            duration: fries.Toast.duration.SHORT
          });

          this.hide(); // this refers to the dialog
        }
      });

      document.querySelector('#open-dialog').addEventListener('touchend', function (e) {
        e.preventDefault();
        dialog.show();
      }, false);
    }

    document.querySelector('#show-toast').addEventListener('touchend', function () {
      var toast = new fries.Toast({ content: "Hi, I'm a Toast notification." });

    }, false);
  };

  var detect = function () {
    if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  };

  // To enable touch events on desktop
  // Remove this when building in PhoneGap
  if (detect) {
    //window.onload = new FingerBlast('body');
  }
} ());