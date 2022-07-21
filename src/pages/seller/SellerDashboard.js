import Layout from "../../components/Layout";
import Seller from "../../components/auth/Seller";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { isAuth } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";
import { Form } from "../../components/useForm";

const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    overflow: "hidden",
  },
}));
const SellerDashboard = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Seller>
        <Paper className={classes.pageContent}>
          <Typography variant="h2">Welcome, {isAuth().firstName}.</Typography>
          <Form>
            <Grid container>
              <Grid item xs={8} className="border">
                <DisabledTextField
                  label="First Name"
                  value={isAuth().firstName}
                  disabled
                  variant="outlined"
                />
                <DisabledTextField
                  label="Middle Name"
                  value={isAuth().middleName}
                  disabled
                  variant="outlined"
                />
                <DisabledTextField
                  label="Last Name"
                  value={isAuth().lastName}
                  disabled
                  variant="outlined"
                />
                <DisabledTextField
                  label="Phone Number"
                  value={isAuth().phone_no}
                  disabled
                  variant="outlined"
                />
                <DisabledTextField
                  label="Username"
                  value={isAuth().username}
                  disabled
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Seller>
    </Layout>
  );
};

export default SellerDashboard;
