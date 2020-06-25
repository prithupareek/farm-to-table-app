import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PostDetails extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    var post = this.props.post;

    var transportationHTML = "";

    if (post.needTransport) {
      transportationHTML = "Requires 3rd-party transportation";
    }

    return (
      <>
        <h4>{post.postName}</h4>
        <p>{post.postDesc}</p>
        <br></br>
        <h6>Address</h6>
        <p style={{ margin: 0, padding: 0 }}>{post.address}</p>
        <p style={{ margin: 0, padding: 0 }}>{post.address2}</p>
        <p style={{ margin: 0, padding: 0 }}>
          {post.city}, {post.state} {post.zip}
        </p>
        <br></br>
        <Row className="d-flex mt-3 mb-3">
          <Col>
            <div className="col-sm-12 my-auto text-center">
              <h6>Produce Ammount</h6>
              <h3>{post.ammount} lbs</h3>
            </div>
          </Col>
          <Col>
            <div className="col-sm-12 my-auto text-center">
              <h6>Produce Price</h6>
              <h3>${post.price}</h3>
            </div>
          </Col>
        </Row>
        <h5>
          <i>{transportationHTML}</i>
        </h5>
      </>
    );
  }
}

export default PostDetails;
