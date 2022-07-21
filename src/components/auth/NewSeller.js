import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { isAuth } from "../../actions/auth";

const NewSellers = (props) => {
  const { history, children } = props;

  useEffect(() => {
    if (!isAuth()) {
      history.push(`/dashboard/newSellers/signin`);
    } else if (isAuth() && isAuth().role == 6) {
      console.log(true);
      history.push("/dashboard/newSellers");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default withRouter(NewSellers);
