import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { IconButton, Snackbar, withStyles } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Made with loads of \u2615 by '}
            <Link color="inherit" href="https://hackerstribe.tech/">
                Hacker's Tribe Foundation
            </Link>{' '}
        </Typography>
    );
}

function getInputValue(){
    // Selecting the input element and get its value 
    var var_emailID = document.getElementById("id_email").value;
    var var_age = document.getElementById("id_age").value;
    var var_pinCode = document.getElementById("").value;
}

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Home extends Component {
    state = {
        pinCodeIdCounter: 0,
        notification_msg: {
            triggered: false,
            message: ""
        }
    }

    render() {
        const { classes } = this.props;

        const getPinCodeIds = (event) => {
            let pincodeCounter = parseInt(Object.assign(this.state.pinCodeIdCounter))
            let pincodeArray = []
            let iter = 0
            for (iter; iter <= pincodeCounter; iter++) {
                pincodeArray.push(iter)
            }
            return pincodeArray
        }

        const onSnackBarHandleClose = () => {
            this.setState({
                notification_msg: {
                    triggered: false,
                    message: ""
                }
            })
        }

        const pincodeIdIncrementer = () => {

            let pincodeCounter = parseInt(Object.assign(this.state.pinCodeIdCounter))

            if (pincodeCounter >= 4) {
                this.setState({
                    notification_msg: {
                        triggered: true,
                        message: "Only 5 pincodes per user are allowed to be tracked"
                    }
                })
            } else {
                pincodeCounter++
                this.setState({
                    pinCodeIdCounter: pincodeCounter
                })
            }
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register for Vaccine Availability
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="id_email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="id_age"
                                    label="Age"
                                    name="age"
                                    autoComplete="age"
                                />
                            </Grid>

                            {getPinCodeIds().map(object=>(
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="pincode"
                                        label="Pincode"
                                        id={"pincode-"+String(object)}
                                    />
                                </Grid>
                            ))}

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={pincodeIdIncrementer}
                            >
                                Add More Pincodes
                            </Button>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onclick="getInputValue();
                        >
                            Register
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.notification_msg.triggered}
                    autoHideDuration={6000}
                    onClose={onSnackBarHandleClose}
                    message={this.state.notification_msg.message}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={onSnackBarHandleClose}>
                                <CloseRounded fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Container>
        );
    }
}

export default withStyles(useStyles)(Home)