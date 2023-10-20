/* eslint-disable no-unused-expressions */
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "./styles.css";

const CustomeLoader = (props) => {
  const { visible } = props;

  if (visible) {
    return (
      <div className="loader">
        <FadeLoader color="red" />
      </div>
    );
  } else null;
};

export default CustomeLoader;
