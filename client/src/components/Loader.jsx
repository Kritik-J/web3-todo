import React from "react";
import styled from "styled-components/macro";

const Loader = () => {
  return (
    <LoaderContainer>
      <div className="indeterminate"></div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow: hidden;
  margin: 0 auto;
  position: fixed;
  background-color: #ffccac;

  .indeterminate {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .indeterminate:before {
    content: "";
    position: absolute;
    height: 100%;
    background-color: #ff731d;

    animation: indeterminate_first 2.5s infinite ease-out;
  }

  @keyframes indeterminate_first {
    0% {
      left: -100%;
      width: 100%;
    }

    100% {
      left: 100%;
      width: 10%;
    }
  }
`;

export default Loader;
