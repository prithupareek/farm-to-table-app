import React from "react";

import ProducerPost from "./components/ProducerPost";

class NewPost extends React.Component {
  constructor(props) {
    super();
    // console.log(props);
  }

  render() {
    return (
      <>
        <ProducerPost />
      </>
    );
  }
}

export default NewPost;
