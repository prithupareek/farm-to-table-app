import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: 200,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const options = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
];

class FilterBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      locations: [],
      types: [],
    };
  }

  componentDidMount() {
    var locations = new Set();
    var types = new Set();

    this.props.posts.forEach((post) => {
      console.log(post);

      locations.add({ value: post.state, label: post.state });
      types.add({ value: post.produceType, label: post.produceType });
    });

    this.setState({
      locations: Array.from(locations),
      types: Array.from(types),
    });
  }

  render() {
    return (
      <div>
        <Row className="mb-2">
          <h6>Filter by</h6>
        </Row>
        <Row>Location</Row>
        <Row className="mb-1">
          <div>
            <Select
              styles={customStyles}
              options={this.state.locations}
              isMulti
            ></Select>
          </div>
        </Row>
        <Row>Price</Row>
        <Row className="mb-1">
          <Form>
            <Form.Group as={Col} controlId="formGridProduceBudgetMin">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Min"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    // console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProduceBudgetMax">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Max"
                  onChange={(event) => {
                    // this.state.ammount = event.target.value;
                    //   console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>
        <Row>Type</Row>
        <Row className="mb-1">
          <Select
            styles={customStyles}
            options={this.state.types}
            isMulti
          ></Select>
        </Row>
        <Row>Quantity</Row>
        <Row>
          <Form>
            <Form.Group as={Col} controlId="formGridProduceBudgetMin">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Min"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    // console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProduceBudgetMax">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Max"
                  onChange={(event) => {
                    // this.state.ammount = event.target.value;
                    //   console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>

        <Row>Avalibility</Row>
        <Row>
          <Form>
            <Form.Group as={Col} controlId="formGridProduceBudgetMin">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Min"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    // console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProduceBudgetMax">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Max"
                  onChange={(event) => {
                    // this.state.ammount = event.target.value;
                    //   console.log(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>
      </div>
    );
  }
}

export default FilterBar;
