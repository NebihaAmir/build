import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { isAuth } from "../../actions/auth";

const Seller = (props) => {
  const { history, children } = props;
  useEffect(() => {
    if (!isAuth()) {
      history.push(`/dashboard/signin`);
    } else if (isAuth() && (isAuth().role == 1 || isAuth().role == 3)) {
      history.push("/dashboard/admin");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default withRouter(Seller);
