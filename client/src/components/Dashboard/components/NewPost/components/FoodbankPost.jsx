import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const emitter = require("../../../../../util/emitter.js");

class FoodBankPost extends React.Component {
  constructor(props) {
    super();
    // console.log(props);
    this.state = {
      postName: "",
      postDesc: "",
      produceBudget: "",
      distributorBudget: "",
      ammount: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      needDistributor: false,
      startDate: "",
      endDate: "",
      produceType: "",
      userEmail: props.userEmail,
      postType: props.postType,
    };

    this.onCheckboxClick = () => {
      this.setState(this.state);
    };

    this.submitPost = () => {
      emitter.emit("post submit", this.state);
      // console.log(JSON.stringify(this.state));
    };
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="formGridPostName">
            <Form.Label>Post Name</Form.Label>
            <Form.Control
              placeholder="Post Name"
              onChange={(event) => {
                this.state.postName = event.target.value;
                // console.log(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridPostDesc">
            <Form.Label>Post Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Post Description"
              onChange={(event) => {
                this.state.postDesc = event.target.value;
                // console.log(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridProduceBudget">
              <Form.Label>Produce Budget</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Budget"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    this.state.produceBudget = event.target.value;
                    // console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAmount">
              <Form.Label>Produce Amount</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Amount"
                  onChange={(event) => {
                    this.state.ammount = event.target.value;
                    //   console.log(event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupAppend">lbs</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridType">
              <Form.Label>Produce Tyoe</Form.Label>
              <Form.Control
                placeholder="Tyoe"
                onChange={(event) => {
                  this.state.produceType = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              onChange={(event) => {
                this.state.address = event.target.value;
                // console.log(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              onChange={(event) => {
                this.state.address2 = event.target.value;
                // console.log(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City"
                onChange={(event) => {
                  this.state.city = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                placeholder="State"
                onChange={(event) => {
                  this.state.state = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                placeholder="Zip"
                onChange={(event) => {
                  this.state.zip = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                placeholder="MM/DD/YY"
                onChange={(event) => {
                  this.state.startDate = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="fromGridEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                placeholder="MM/DD/YY"
                onChange={(event) => {
                  this.state.endDate = event.target.value;
                  //   console.log(event.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Distributor Required"
                onChange={(event) => {
                  this.state.needDistributor = !this.state.needDistributor;
                  // console.log(event.target.value);
                  this.onCheckboxClick();
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            {this.state.needDistributor ? (
              <Form.Group as={Col} controlId="formGridDistBudget">
                <Form.Label>Distributor Budget</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Budget"
                    aria-describedby="inputGroupPrepend"
                    onChange={(event) => {
                      this.state.distributorBudget = event.target.value;
                      // console.log(event.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            ) : null}
          </Form.Row>
          <Button
            onClick={this.submitPost}
            type="submit"
            variant="primary"
            block
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default FoodBankPost;
