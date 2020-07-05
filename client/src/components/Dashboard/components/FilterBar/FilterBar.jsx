import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const emitter = require("../../../../util/emitter.js");

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

class FilterBar extends Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      locations: [],
      types: [],
      filters: {
        states: [],
        minPrice: "",
        maxPrice: "",
        types: [],
        minQuan: "",
        maxQuan: "",
        minAval: "",
        maxAval: "",
      },
    };

    // emit a filter submit event
    this.filter = (filter) => {
      emitter.emit("filter submit", filter);
      this.setState({ filters: filter });
    };
  }

  componentDidMount() {
    var locations = new Set();
    var types = new Set();

    this.props.posts.forEach((post) => {
      // console.log(post);

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
              onChange={(event) => {
                var states = [];
                if (event != null) {
                  event.forEach((item) => {
                    states.push(item.value);
                  });
                }
                var filter = JSON.parse(JSON.stringify(this.state.filters));
                filter.states = Array.from(states);
                this.filter(filter);
              }}
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
                    var filter = JSON.parse(JSON.stringify(this.state.filters));
                    filter.minPrice = event.target.value;
                    this.filter(filter);
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
                    var filter = JSON.parse(JSON.stringify(this.state.filters));
                    filter.maxPrice = event.target.value;
                    this.filter(filter);
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
            onChange={(event) => {
              var types = [];
              if (event != null) {
                event.forEach((item) => {
                  types.push(item.value);
                });
              }
              var filter = JSON.parse(JSON.stringify(this.state.filters));
              filter.types = Array.from(types);
              this.filter(filter);
            }}
          ></Select>
        </Row>
        <Row>Quantity</Row>
        <Row>
          <Form>
            <Form.Group as={Col} controlId="formGridProduceQuantityMin">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Min"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    var filter = JSON.parse(JSON.stringify(this.state.filters));
                    filter.minQuan = event.target.value;
                    this.filter(filter);
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProduceQuantityMax">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Max"
                  onChange={(event) => {
                    var filter = JSON.parse(JSON.stringify(this.state.filters));
                    filter.maxQuan = event.target.value;
                    this.filter(filter);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>

        <Row>Avalibility</Row>
        <Row>
          <Form>
            <Form.Group as={Col} controlId="formGridAvalibilityMin">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Start Date (MM/DD/YY)"
                  aria-describedby="inputGroupPrepend"
                  onChange={(event) => {
                    if (event.target.value.length == 8) {
                      var filter = JSON.parse(
                        JSON.stringify(this.state.filters)
                      );
                      filter.minAval = event.target.value;
                      this.filter(filter);
                    }
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAvalibilityMax">
              <InputGroup>
                <Form.Control
                  placeholder="End Date (MM/DD/YY)"
                  onChange={(event) => {
                    if (event.target.value.length == 8) {
                      var filter = JSON.parse(
                        JSON.stringify(this.state.filters)
                      );
                      filter.maxAval = event.target.value;
                      this.filter(filter);
                    }
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
