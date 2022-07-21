import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useLazyQuery } from "@apollo/client";
import { AdminLogin, SellerLogin, NeweSellerLogin } from "../../graphql/auth";
import { authentication, isAuth } from "../../actions/auth";
import { withRouter } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { InputAdornment } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import Controls from "../controls/Controls";
import logo from "../../Logos/Alga-logo.png";
import { useForm, Form } from "../useForm";

const useStyles = makeStyles((theme) => ({
  fields: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  image: {
    maxHeight: "50%",
    maxWidth: "50%",
  },
}));
const initialFValues = {
  username: "",
  password: "",
};
const SigninComponent = (props) => {
  const classes = useStyles();
  const { history, location } = props;
  const [loginError, setLoginError] = useState(null);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length != 0 ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate, setLoginError);

  const [adminLogin] = useLazyQuery(AdminLogin, { 
    onCompleted: (data) =>
      authentication(data.adminLogin, () => {
        if (isAuth()) {
          history.push("/dashboard/admin");
        }
      }),
    onError: (error) => setLoginError(error.message),
  });
  const [sellerLogin] = useLazyQuery(SellerLogin, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      authentication(data.sellerLogin, () => {
        if (isAuth()) {
          history.push("/dashboard");
        }
      }),
    onError: (error) => setLoginError(error.message),
  });
  const [newSellerLogin] = useLazyQuery(NeweSellerLogin, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      authentication(data.newSellerLogin, () => {
        if (isAuth()) {
          history.push("/dashboard/newSellers");
        }
      }),
    onError: (error) => setLoginError(error.message),
  });

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (location.pathname.includes("/admin")) {
        adminLogin({
          variables: {
            adminLoginUsername: values.username,
            adminLoginPassword: values.password,
          },
        });
      }
      else if(location.pathname.includes("/newSellers")){
             newSellerLogin({
               variables: {
                 sellerLoginUsername: values.username,
                 sellerLoginPassword: values.password,
               },
             });
      }
       else {
        sellerLogin({
          variables: {
            sellerLoginUsername: values.username,
            sellerLoginPassword: values.password,
          },
        });
      }
    }
  };

  useEffect(() => {
    if ((isAuth() && isAuth().role == 1) || isAuth().role == 3)

      history.push("/dashboard/admin");
  else if ((isAuth() && isAuth().role == 6)){
     history.push("/dashboard/newSellers");

   }
    else isAuth() && history.push("/dashboard");
  }, []);
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <Card className="max-w-sm">
        <div className="flex justify-center align-center">
          <img src={logo} className={classes.image} />
        </div>
        <CardContent>
          <div className="mb-8 ">
            <Typography variant="h5" color="primary">
              Login
            </Typography>
            Signin to your account
          </div>
          {history.location.state && (
            <Alert severity="error">{history.location.state}</Alert>
          )}
          {loginError && <Alert severity="error">{loginError}</Alert>}

          <form onSubmit={HandleSubmit}>
            <Controls.Input
              label="Username"
              value={values.username}
              name="username"
              className={classes.fields}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Controls.Input
              label="Password"
              value={values.password}
              name="password"
              className={classes.fields}
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              error={errors.password}
            />

            <CardActions>
              <Controls.Button color="primary" type="submit" text="Login" />
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRouter(SigninComponent);
