jQuery(window).ready(function(){
        
			jQuery(".club").click(initiate_geolocation);
    	});

jQuery(window).ready(function(){

			jQuery(".setStart").click(initiate_secondgeo);
		});
		
		var startpoint
		
        function initiate_geolocation() {
            startpoint = navigator.geolocation.watchPosition(calculateSpot, handle_errors, {enableHighAccuracy:true} );

			// This is what worked for getting the direction directly
			// navigator.geolocation.getCurrentPosition(calculate_distanceH,handle_errors);
			
        }

		function initiate_secondgeo() {
			var endpoint = navigator.geolocation.watchPosition(calculate_distanceH, handle_errors, {enableHighAccuracy:true} );
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
					localStorage.setItem("savedPos", startPos); //saves to the database, "key", "value"
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
		
		//Calculates the distance between position1 and position2
		function calculate_distanceH(position1){
			var R = 6371; // km
			var lat1 = position1.coords.latitude;
			var lon1 = position1.coords.longitude;
			
			//fetches the position that has been saved
			try {
				var savedPost = localStorage.getItem("savedPos"); //Hello World!
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
			var d = (R * c)*1000;
			document.getElementById("distance").innerHTML= d;
			
			//Delete the position that had been saved.
			localStorage.removeItem("savedPos"); //deletes the matching item from the database
			alert('distance:' + d + 'meters');
			
		}
		
		if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
		    return this * Math.PI / 180;
		  }
		}
