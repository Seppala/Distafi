jQuery(window).ready(function(){
        	
			//When one of the club links is clicked the geolocation is started
			jQuery(".club").click(initiate_geolocation);
			
			//When calculate is clicked the geoposition for the second place(where the ball landed) 
			//is calculated and the distance also calculated and shown to the user
			jQuery("#calculate").click(initiate_secondgeo);
			
			//When "save" is clicked the shot metrics (geopositions, club and distance) are saved.
			jQuery("#saveShot").click(saveShot);
			
			var clubId;
			jQuery(".club").click(function() {
				clubId = $(this).attr("id");
				localStorage.setItem("currentClub", clubId);
				document.getElementById("club").innerHTML= clubId;
				
			});
		});
		
		
		// startpoint is a variable that is used to store the starting location of a shot. 
		var startpoint
		
		//initiates a geolocation and sends it to calculateSpot that calculates and gives location to user
        function initiate_geolocation() {
            startpoint = navigator.geolocation.watchPosition(calculateSpot, handle_errors, {enableHighAccuracy:true} );
			
        }
		//the endpoint variable is used to store the ending location of a shot or another place compared to where the shot was
		//hit from
		var endpoint
		
		function initiate_secondgeo() {
			endpoint = navigator.geolocation.watchPosition(calculate_distanceH, handle_errors, {enableHighAccuracy:true} );
		}
		
		//Shows the spot and accuracy to the user
		
		var startPos;
		
		function calculateSpot(position)
		{
			var pointAccur = position.coords.accuracy;
			
			//Calculate the position
			startPos = position;
			//show the user the position
			document.getElementById("accuracy").innerHTML= pointAccur;
			document.getElementById("longitude").innerHTML= startPos.coords.longitude;
			document.getElementById("latitude").innerHTML= startPos.coords.latitude;
			
			//When the startcalculate button is pressed, save the result in the startPos variable.
			
			//When the calculate button is pressed, if the startPos variable isn't null, calculate the distance 
			
			//Save all the info as a shot.
			
		}
		
		//Saves the current position that has been calculated by initate_geolocation.
		//Then resets the geolocation to get ready to fetch the ending location of the ball. 
		//Then saves the current position so that it can be used for calculation with a new position.
		function saveStartPos(startPos) {
			//saves current position
			
			//saves the savedPos to the browsers local storage
			if (typeof(localStorage) == 'undefined' ) {
				alert('Your browser does not support HTML5 localStorage. Try upgrading.');
			} else {
				try {
					localStorage.setItem("savedPos", JSON.stringify(startPos)); //saves to the database, "key", "value"
				} catch (e) {
				 	 if (e == QUOTA_EXCEEDED_ERR) {
				 	 	 alert('Data couldnt be saved because the Quota was exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}

			}
			document.getElementById("longitude1").innerHTML= startPos.coords.longitude;
			document.getElementById("latitude1").innerHTML= startPos.coords.latitude;
			
			//stops the geolocation
			stopWatch();
			
		}
		
		function stopWatch() {
		      // Cancel the updates when the user clicks a button.
		      navigator.geolocation.clearWatch(startpoint);
		    }

        function handle_errors(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;

                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;

                case error.TIMEOUT: alert("retrieving position timed out");
                break;

                default: alert("unknown error");
                break;
            }
        }
		//d is the variable for the distance.
		var d;
		
		//Calculates the distance between position1 and position2
		function calculate_distanceH(position1){
			var R = 6371; // km
			var lat1 = position1.coords.latitude;
			var lon1 = position1.coords.longitude;
			
			//saves the ending location (position1) to the browsers local storage
			if (typeof(localStorage) == 'undefined' ) {
				alert('Your browser does not support HTML5 localStorage. Try upgrading.');
			} else {
				try {
					localStorage.setItem("endingPos", JSON.stringify(position1)); //saves to the database, "key", "value"
				} catch (e) {
				 	 if (e == QUOTA_EXCEEDED_ERR) {
				 	 	 alert('Data couldnt be saved because the Quota was exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}

			}
			//fetches the position that has been saved
			try {
				var savedPost = localStorage.getItem("savedPos"); 
				
				savedPost = jQuery.parseJSON( savedPost );
			} catch (e) {
				
				alert('Couldnt fetch the location where the ball was hit from? Did you remember to set it? Sorry about that.');
				return;
			}
			try {
				var lat2 = savedPost.coords.latitude;
				var lon2 = savedPost.coords.longitude;
			} catch (f) {
				alert('Couldnt get the second coordinates. Cant fetch your current position.')
			}
			
			//Calculate the distance d from the saved position to the new fetched position.
			var dLat = (lat2-lat1).toRad();
			var dLon = (lon2-lon1).toRad();
			
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			        Math.sin(dLon/2) * Math.sin(dLon/2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			d = (R * c)*1000;
			
			//show the distance to the user in the element with the id "distance"
			document.getElementById("distance").innerHTML= d;
			
		}
		
		function saveShot(position) {
			//Create a shot object and save it.
			savedPos = localStorage.getItem("savedPos");
			savedEnd = localStorage.getItem("savedEnd");
			clubId = localStorage.getItem("currentClub");
			
			//Create the shot object
			var shot = {'club': clubId, 'start': savedPos, 'end': savedEnd, 'distance': d};
			//create a unique ID for the object.
			var newDate = new Date();
			var itemId = newDate.getTime();
			
			try {
				localStorage.setItem("shot" + itemId, JSON.stringify(shot)); //saves to the database, "key", "value"
				alert('Shot saved! You shot ' + d + ' meters with your ' + clubId);
				
			} catch (e) {
			 	 if (e == QUOTA_EXCEEDED_ERR) {
			 	 	 alert('For some reason we couldnt save this shot');
				}
			}
			//delete the locally saved positions for shots.
			
			//Delete the position that had been saved.
			localStorage.removeItem("savedPos"); 
			localStorage.removeItem("savedEnd");
			stopWatch();
		}
		if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
		    return this * Math.PI / 180;
		  }
		}
