let canvas, ctx;

function loadMap() {
    canvas = document.getElementById("mapCanvas");
    canvas.width = 1700;
    canvas.height = 700;
    ctx = canvas.getContext("2d");

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        credentials: 'AuhSjvzHlgITGN53OEHjFtbuJ4qSRuUjPOvapl2H7-xK3xQeX6Sd7ILdag5aI-Wr',
        callback: function () {
            const mapContainer = document.getElementById("bingMapsControl");
            const bingMapsControl = new Microsoft.Maps.Map(mapContainer, {
                credentials: 'AuhSjvzHlgITGN53OEHjFtbuJ4qSRuUjPOvapl2H7-xK3xQeX6Sd7ILdag5aI-Wr',
                center: new Microsoft.Maps.Location(0, 0),
                zoom: 1 
            });

            document.getElementById("getLocationButton").addEventListener("click", getMyLocation);

            function getMyLocation() {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
                } else {
                    alert("Geolocation is not available in your browser.");
                }
            }

            function locateSuccess(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                bingMapsControl.setView({ center: new Microsoft.Maps.Location(latitude, longitude), zoom: 15 });

                
                bingMapsControl.entities.clear();

                const userLocation = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(latitude, longitude), { 
                    color: 'blue',
                    title: 'You are here',
                    
                    
                    
                 });
                bingMapsControl.entities.push(userLocation);

                          

               
            }

            function locateFail(error) {
                alert("Failed to get your location: " + error.message);
            }
        }
    });
}

window.onload = loadMap