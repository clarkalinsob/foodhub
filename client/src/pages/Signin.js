import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Form, Icon } from "semantic-ui-react";

function Signin() {
    const responseGoogle = response => {
        console.log(response);
    };

    return (
        <div className="form-container">
            <Form noValidate>
                <h1>Log in to Food App</h1>
                <h3>
                    <a href="/signup">
                        <u> or signup an account</u>
                    </a>
                </h3>
                <br />
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="displayName"
                    type="text"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                />
                <Button fluid type="submit" positive>
                    Log In
                </Button>
                <br />
                <GoogleLogin
                    clientId="11092705321-gccolrcjlovlcfqjr6cm115ltdhqm1c0.apps.googleusercontent.com"
                    render={renderProps => (
                        <Button
                            fluid
                            primary
                            basic
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <Icon name="google" /> Log in with Google
                        </Button>
                    )}
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
            </Form>
        </div>
    );
}

export default Signin;
