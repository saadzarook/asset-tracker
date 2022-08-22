import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map 
        google={this.props.google}
        center={{
         lat: this.props.marker.lat,
         lng: this.props.marker.lng
        }
        }
        zoom={10}
        onClick={this.onMapClicked}
        >
          <Marker
          position = {{
            lat: this.props.marker.lat,
            lng: this.props.marker.lng
           }}
          icon={'http://maps.google.com/mapfiles/arrow.png'}
          onClick={this.onMarkerClick}
          name={this.props.marker.objectName}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>Object ID: {this.state.selectedPlace.name}</h4>
            <h4>Product Description: Tool Description</h4>
            <h4>Last Updated: {this.props.marker.lastUpdated}</h4>
          </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "",
  
})(MapContainer);
