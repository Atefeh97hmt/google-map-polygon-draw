var map;
var drawingManager;
var drawnPolygon;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.5916, lng: 52.5836 }, // Coordinates for Shiraz, Iran
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        
        polygonOptions: {
            fillColor: '#91ff00',
            fillOpacity: 0.45,
            editable: true
        }
    });

    drawingManager.setMap(map);

    // Add event listener for polygon complete
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        if (event.type == google.maps.drawing.OverlayType.POLYGON) {
            // Show the share link
            var shareLink = document.getElementById('shareLink');
            shareLink.style.display = 'block';
            // Store the drawn polygon
            drawnPolygon = event.overlay;
            // Create link to the map with the polygon's coordinates
            var polygonBounds = event.overlay.getPath().getArray();
            var polygonCoords = [];
            for (var i = 0; i < polygonBounds.length; i++) {
                polygonCoords.push(polygonBounds[i].lat() + ',' + polygonBounds[i].lng());
            }
            var mapLink = 'https://www.google.com/maps/dir//' + polygonCoords.join('/');
            shareLink.href = mapLink;
        }
    });

    // Add event listener for polygon editing
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        if (event.type == google.maps.drawing.OverlayType.POLYGON) {
            // Update the share link when the polygon is edited
            var polygonBounds = event.overlay.getPath().getArray();
            var polygonCoords = [];
            for (var i = 0; i < polygonBounds.length; i++) {
                polygonCoords.push(polygonBounds[i].lat() + ',' + polygonBounds[i].lng());
            }
            var mapLink = 'https://www.google.com/maps/dir//' + polygonCoords.join('/');
            document.getElementById('shareLink').href = mapLink;
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
