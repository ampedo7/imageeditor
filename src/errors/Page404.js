import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import StyleWrapper from "./styles";

const Page404 = () => {
  return (
    <Fragment>
      <Helmet>
        <title>404 | Page not found</title>
      </Helmet>
      <StyleWrapper>
        <div className="errors-container">
          <span className="message-content">
            <h1>404</h1>Page Not Found
          </span>
        </div>
      </StyleWrapper>
    </Fragment>
  );
};

export default Page404;
