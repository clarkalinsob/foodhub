import React, { useContext, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Divider, Form, Icon, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { SIGNIN_GOOGLE, SIGNIN_USER } from "../util/graphql";
const { GOOGLE_CLIENT_ID } = require("../config");

function Signin(props) {
    // START Sign up Manually
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(signinUserCallback, {
        email: "",
        password: ""
    });

    const [signinUser, { loading }] = useMutation(SIGNIN_USER, {
        variables: values,
        update(
            _,
            {
                data: { signin: userData }
            }
        ) {
            context.signin(userData);
            props.history.push("/meals");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
    });

    function signinUserCallback() {
        signinUser();
    }
    // END Sign up Manually

    // START Sign up with Google
    const [token, setToken] = useState({
        token: ""
    });

    const [signinGoogle] = useMutation(SIGNIN_GOOGLE, {
        variables: token,
        update(
            _,
            {
                data: { signinGoogle: userData }
            }
        ) {
            context.signin(userData);
            props.history.push("/meals");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
    });

    const responseGoogle = ({ tokenId }) => {
        setToken({
            token: tokenId
        });

        signinGoogle();
    };
    // END Sign up with Google

    return (
        <div className="form-container">
            {context && !context.user ? (
                <Segment>
                    <div className="segment">
                        <Form
                            onSubmit={onSubmit}
                            noValidate
                            className={loading ? "loading" : ""}
                        >
                            <h1>Sign in to Foodhub</h1>
                            <h3>
                                <a href="/signup">
                                    <u> or create an account</u>
                                </a>
                            </h3>
                            <br />
                            <Form.Input
                                label="Email Address"
                                placeholder="e.g., clark.alinsob@email.com"
                                name="email"
                                type="email"
                                value={values.email}
                                error={errors.email ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                label="Password"
                                placeholder="e.g., &#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                name="password"
                                type="password"
                                value={values.password}
                                error={errors.password ? true : false}
                                onChange={onChange}
                            />
                            <Button fluid type="submit" positive>
                                Sign In
                            </Button>
                        </Form>
                        <Divider horizontal>Or</Divider>
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <Button
                                    fluid
                                    primary
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <Icon name="google" /> Sign in with Google
                                </Button>
                            )}
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                        {Object.keys(errors).length > 0 && (
                            <div className="ui error message">
                                <div className="content">
                                    <div className="header">
                                        There was some errors with your
                                        submission
                                    </div>
                                    <ul className="list">
                                        {Object.values(errors).map(value => (
                                            <li className="content" key={value}>
                                                {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </Segment>
            ) : (
                ""
            )}
        </div>
    );
}

export default Signin;
