const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const google = window.google;
export const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCw6ROA0bN6K187-zO-1zoUy1Oog8AyUNo&libraries=geometry,drawing,places",
    loadingElement: <div style={{width: '100%', height: '100vh', position: 'relative'}} />,
    containerElement: <div style={{width: '100%', height: '100vh', position: 'relative'}} />,
    mapElement: <div style={{width: '100%', height: '100vh', position: 'relative'}} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={new google.maps.LatLng(-34.397, 150.644)}
  >
    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        polygonOptions: { editable: true },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      }}
      onPolygonComplete= {props.onPolygonComplete}
    />
  </GoogleMap>

  
);
