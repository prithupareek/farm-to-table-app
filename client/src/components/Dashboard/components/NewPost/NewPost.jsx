import React from "react";

import ProducerPost from "./components/ProducerPost";
import ConsumerPost from "./components/ConsumerPost";

class NewPost extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    // load different post pages based on account type
    if (this.props.accountType == "producer") {
      return (
        <>
          <ProducerPost />
        </>
      );
    } else if (this.props.accountType == "consumer") {
      return (
        <>
          <ConsumerPost />
        </>
      );
    }
  }
}

export default NewPost;
