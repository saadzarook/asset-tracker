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


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  



  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map 
        google={this.props.google}
        center={this.props.markers[0].position}
        zoom={8}
        onClick={this.onMapClicked}
        style={{width: '80%', height: '100%', position: 'relative'}}
        >
        {this.props.markers.map((marker) => (
        <Marker
        key={marker.id}
        title={marker.objectName}
        name={marker.description}
        position={marker.position}
        onClick={this.onMarkerClick}
      />
      ))}
      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.title}</h4>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCw6ROA0bN6K187-zO-1zoUy1Oog8AyUNo",
  
})(MapContainer);
