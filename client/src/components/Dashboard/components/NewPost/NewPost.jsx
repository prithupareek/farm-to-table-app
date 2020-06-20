import React from "react";

import GrowerPost from "./components/GrowerPost";
import FoodBankPost from "./components/FoodbankPost";

class NewPost extends React.Component {
  constructor(props) {
    super();
    // console.log(props);
  }

  render() {
    // load different post pages based on account type
    if (this.props.accountType == "grower") {
      return (
        <>
          <GrowerPost userEmail={this.props.userEmail} postType={"grower"} />
        </>
      );
    } else if (this.props.accountType == "foodbank") {
      return (
        <>
          <FoodbankPost
            userEmail={this.props.userEmail}
            postType={"foodbank"}
          />
        </>
      );
    }
  }
}

export default NewPost;
