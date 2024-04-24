var map;
var drawingManager;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 24.8998373, lng: 91.8258764 },
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
}

google.maps.event.addDomListener(window, 'load', initialize);