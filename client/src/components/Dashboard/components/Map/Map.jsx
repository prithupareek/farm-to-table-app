import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

const emitter = require("../../../../util/emitter.js");

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

    var markerArray = [];

    // get all the posts
    this.props.posts.forEach((post) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([post.long, post.lat])
        .addTo(map);

      markerArray.push(marker);

      marker.getElement().addEventListener("click", () => {
        // alert("Clicked on " + post.long + ", " + post.lat);
        this.props.action(post);
      });
    });

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
