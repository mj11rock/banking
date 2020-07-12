import React, {useState} from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import Endpoint from "../service"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Signup = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()
  const {clickRegistration} = props
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              const data = {
                name,
                password,
                email,
              }
              const result = Endpoint.call("register", data)
              result
                .then((res) => {
                  if (res.okey) {
                    console.log("Registered")
                    clickRegistration()
                  } else console.log("Err with registraion")
                })
                .catch((err) => console.log(err))
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  clickRegistration()
                }}
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Signup
