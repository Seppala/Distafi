jQuery(window).ready(function(){
            jQuery("#btnInit").click(initiate_geolocation);
        });

        function initiate_geolocation() {
            navigator.geolocation.getCurrentPosition(calculate_distanceH,handle_errors);
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

        function handle_geolocation_query(position){
            
					alert('Lat: ' + position.coords.latitude +
                  ' Lon: ' + position.coords.longitude);
        }
		
		function calculate_distance(position1){
			var point1 = new google.maps.LatLng(position1.coords.latitude, position1.coords.longitude);
			var point2 = new google.maps.LatLng(60.7,25.8);
			var dist = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
			alert('distance:' + dist);
			
		
		}
		
		function calculate_distanceH(position1){
			var R = 6371; // km
			var lat1 = position1.coords.latitude;
			var lon1 = position1.coords.longitude;
			var lat2 = 60.7;
			var lon2 = 25.8;
			
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
