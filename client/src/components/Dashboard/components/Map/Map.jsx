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
      markers: [],
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    this.setState({ map: map });

    var markerList = [];

    // get all the posts
    this.props.posts.forEach((post) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([post.long, post.lat])
        .addTo(map);

      markerList.push(marker);

      marker.getElement().addEventListener("click", () => {
        // alert("Clicked on " + post.long + ", " + post.lat);
        this.props.action(post);
      });
    });

    this.setState({ markers: markerList });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(this.state);
    this.state.markers.forEach((marker) => {
      marker.remove();
    });

    var markerList = [];

    // get all the posts
    nextProps.posts.forEach((post) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([post.long, post.lat])
        .addTo(this.state.map);

      markerList.push(marker);

      marker.getElement().addEventListener("click", () => {
        // alert("Clicked on " + post.long + ", " + post.lat);
        this.props.action(post);
      });
    });

    this.setState({ markers: markerList });
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
