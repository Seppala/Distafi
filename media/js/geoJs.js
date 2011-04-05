jQuery(window).ready(function(){
        
			jQuery(".club").click(initiate_geolocation);
    	});

        function initiate_geolocation() {
            var startpoint = navigator.geolocation.watchPosition(calculateSpot, handle_errors, {enableHighAccuracy:true} );

			// This is what worked for getting the direction directly
			// navigator.geolocation.getCurrentPosition(calculate_distanceH,handle_errors);
			
        }

		
		function calculateSpot(position)
		{
			var startingPoint = position;
			var pointAccur = position.coords.accuracy;
			
			document.getElementById("demo").innerHTML= 'Accuracy: ' + pointAccur;
			
			//alert('Lat: ' + position.coords.latitude + 'Lon: ' + position.coords.longitude + 'accuracy: ' + pointAccur);
			
			
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
		//Gives an alert of the current latitude and longitude.
        function handle_geolocation_query(position){
            
					alert('Lat: ' + position.coords.latitude +
                  ' Lon: ' + position.coords.longitude);
        }
		
		//Calculates the distance between position1 and position2
		function calculate_distanceH(position1, position2){
			var R = 6371; // km
			var lat1 = position1.coords.latitude;
			var lon1 = position1.coords.longitude;
			var lat2 = position2.coords.latitude;
			var lon2 = position2.coords.longitude;
			
			var dLat = (lat2-lat1).toRad();
			var dLon = (lon2-lon1).toRad();
			
			//var dLat = (position1.coords.latitude-60.7).toRad();
			//var dLon = (position1.coords.longitude-25.8).toRad(); 
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			        Math.sin(dLon/2) * Math.sin(dLon/2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = (R * c)*1000;
			alert('distance:' + d + 'meters');
		}
		
		if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
		    return this * Math.PI / 180;
		  }
		}
