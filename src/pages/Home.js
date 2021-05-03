import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {IconButton, Snackbar, withStyles} from "@material-ui/core";
import {CloseRounded} from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';

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
        form_details: {
            email: "",
            age: "",
            pincode_0: "",
            pincode_1: "",
            pincode_2: "",
            pincode_3: "",
            pincode_4: ""
        },
        pinCodeIdCounter: 0,
        notification_msg: {
            triggered: false,
            message: ""
        },
        error_notification_msg: {
            triggered: false,
            message: ""
        }
    }

    render() {
        const {classes} = this.props;

        const onInputChange= (event)=>{
            let form_details = Object.assign({}, this.state.form_details)
            form_details[event.target.id] = event.target.value
            this.setState({
                form_details: form_details
            })
        }

        const onSubmitForm= (event)=>{
            let form_data= Object.assign({}, this.state.form_details)

            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form_data.email)))
            {

                //console.log("Incorrect Email")
                this.setState({
                    form_details: {
                        email: "",
                        age: "",
                        pincode_0: "",
                        pincode_1: "",
                        pincode_2: "",
                        pincode_3: "",
                        pincode_4: ""
                    },
                    error_notification_msg: {
                        triggered: true,
                        message: "Error: Incorrect email address"
                    }
                })

                return null;

            }

            let age= parseInt(form_data.age)
            if(isNaN(age)){
                //console.log("Incorrect Age")
                this.setState({
                    form_details: {
                        email: "",
                        age: "",
                        pincode_0: "",
                        pincode_1: "",
                        pincode_2: "",
                        pincode_3: "",
                        pincode_4: ""
                    },
                    error_notification_msg: {
                        triggered: true,
                        message: "Error: Incorrect age"
                    }
                })

                return null;
            }else if(age>130 || age<0){
                this.setState({
                    form_details: {
                        email: "",
                        age: "",
                        pincode_0: "",
                        pincode_1: "",
                        pincode_2: "",
                        pincode_3: "",
                        pincode_4: ""
                    },
                    error_notification_msg: {
                        triggered: true,
                        message: "Error: Value of age should be between 0-130"
                    }
                })

                return null;
            }

            form_data.age= parseInt(form_data.age)

            let iter=0
            for(iter; iter<=4; iter++){
                if(form_data["pincode_"+iter]===""){
                    form_data["pincode_"+iter]=0
                }else{
                    let pinNumber= parseInt(form_data["pincode_"+iter])
                    if(isNaN(pinNumber) || String(pinNumber).length>6){
                        //console.log("Incorrect Age")
                        this.setState({
                            form_details: {
                                email: "",
                                age: "",
                                pincode_0: "",
                                pincode_1: "",
                                pincode_2: "",
                                pincode_3: "",
                                pincode_4: ""
                            },
                            error_notification_msg: {
                                triggered: true,
                                message: "Error: Incorrect pincode"
                            }
                        })

                        return null;
                    }else{
                        form_data["pincode_"+iter]=parseInt(form_data["pincode_"+iter])
                    }
                }
            }

            //Need to send request to backend
            console.log(form_data)
            this.setState({
                notification_msg: {
                    triggered: true,
                    message: "Request sent to COWIN, you shall receive a email with details"
                }
            })

        }

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

        const onErrorSnackBarHandleClose = () => {
            this.setState({
                error_notification_msg: {
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
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Check for Vaccine Availability
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    value={this.state.form_details.email}
                                    onChange={onInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    autoComplete="age"
                                    value={this.state.form_details.age}
                                    onChange={onInputChange}
                                />
                            </Grid>

                            {getPinCodeIds().map((object, index) => (
                                <Grid item xs={12} key={index}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="pincode"
                                        label={"Pincode-" + String(object+1)}
                                        id={"pincode_" + String(object)}
                                        value={this.state.form_details["pincode_" + String(object)]}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
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

                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmitForm}
                        >
                            Check for Availability
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
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
                                <CloseRounded fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <Snackbar open={this.state.error_notification_msg.triggered} autoHideDuration={6000} onClose={onErrorSnackBarHandleClose}>
                    <MuiAlert elevation={6} variant="filled" severity="error">
                        {this.state.error_notification_msg.message}
                    </MuiAlert>
                </Snackbar>
            </Container>
        );
    }
}

export default withStyles(useStyles)(Home)