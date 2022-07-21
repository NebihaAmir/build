import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { isAuth } from "../../actions/auth";

const Admin = (props) => {
  const { history, children } = props;
  useEffect(() => {
    if (!isAuth()) {
      history.push(`/dashboard/admin/signin`);
    } else if (isAuth() && (isAuth().role == 2 || isAuth().role == 4)) {
      history.push("/dashboard");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default withRouter(Admin);
