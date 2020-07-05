import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import NavigationBar from "../NavigationBar";
import Map from "./components/Map/Map";
import NewPost from "./components/NewPost/NewPost";
import NewPostBtn from "./components/NewPostBtn";
import PostDetails from "./components/PostDetails/PostDetails";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from "./components/FilterBar/FilterBar";

const emitter = require("../../util/emitter.js");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    this.markerHandler = this.markerHandler.bind(this);

    this.state = {
      showNewPost: false,
      showMarker: false,
      postDetails: {
        postName: "",
        postDesc: "",
        produceBudget: 0,
        distributorBudget: 0,
        ammount: 0,
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        needDistributor: false,
        startDate: "",
        endDate: "",
        produceType: "",
        userEmail: "",
        postType: "",
        lat: 0,
        long: 0,
      },
      posts: this.props.posts,
    };
  }

  // This method will be sent to the child component
  handler() {
    this.setState({
      showNewPost: true,
    });
  }

  markerHandler(post) {
    this.setState({
      showMarker: true,
      postDetails: post,
    });
  }

  componentDidMount() {
    emitter.on("update posts", (res) => {
      this.setState({ posts: res });
      // console.log(this.state.posts);
    });

    var filter = {
      states: [],
      minPrice: "",
      maxPrice: "",
      types: [],
      minQuan: "",
      maxQuan: "",
      minAval: "",
      maxAval: "",
    };

    var query = { query: "", accountType: this.props.user.accountType };

    // when a search is made
    emitter.on("search submit", (req) => {
      query = JSON.parse(JSON.stringify(req));

      emitter.emit("database query", { filter: filter, query: query });
    });

    // when a filter is added
    emitter.on("filter submit", (req) => {
      filter = JSON.parse(JSON.stringify(req));

      emitter.emit("database query", { filter: filter, query: query });
    });
  }

  render() {
    return (
      <>
        <div className="d-flex vh-100">
          <Row className="flex-fill no-gutters">
            <Col className="d-flex flex-column h-100">
              <NavigationBar />
              <Row className="d-flex mt-3 mb-3">
                <Col>
                  <div className="col-sm-12 my-auto text-center">
                    <h3>Welcome, {this.props.user.name}</h3>
                  </div>
                </Col>
                <Col>
                  <NewPostBtn
                    accountType={this.props.user.accountType}
                    action={this.handler}
                  />
                </Col>
                <Col>
                  <div className="col-sm-12 my-auto text-center">
                    <a
                      href="/logout"
                      className="btn btn-lg btn-outline-primary mx-auto"
                    >
                      Logout
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2 mb-2 ml-3 mr-3">
                <div className="col-sm-12 my-auto text-center">
                  <SearchBar
                    accountType={this.props.user.accountType}
                  ></SearchBar>
                </div>
              </Row>
              <Row className="flex-fill">
                <Col xs="auto ml-5 mr-3 mt-2 mb-2 pt-2">
                  <FilterBar
                    posts={this.state.posts}
                    accountType={this.props.user.accountType}
                  ></FilterBar>
                </Col>
                <Map posts={this.state.posts} action={this.markerHandler} />
              </Row>
            </Col>
          </Row>
        </div>

        <Modal
          size="lg"
          scrollable
          centered
          show={this.state.showNewPost}
          onHide={() => this.setState({ showNewPost: false })}
        >
          <Modal.Header closeButton style={{ border: "none", zIndex: 1041 }} />
          <Modal.Body className="mt-n5">
            <Container className="text-left">
              <h3 className="font-weight-bold">New Post</h3>
              <br></br>
              <NewPost
                accountType={this.props.user.accountType}
                userEmail={this.props.user.email}
              />
            </Container>
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          scrollable
          centered
          show={this.state.showMarker}
          onHide={() => this.setState({ showMarker: false })}
        >
          <Modal.Header closeButton style={{ border: "none", zIndex: 1041 }} />
          <Modal.Body className="mt-n5">
            <Container className="text-left">
              <h3 className="font-weight-bold">Post Details</h3>
              <br></br>
              <PostDetails post={this.state.postDetails} />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Dashboard;
