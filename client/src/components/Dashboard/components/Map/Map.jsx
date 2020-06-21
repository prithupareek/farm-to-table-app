import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    var marker = new mapboxgl.Marker().setLngLat([30.5, 50.5]).addTo(map);

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div className="flex-fill">
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default Map;
