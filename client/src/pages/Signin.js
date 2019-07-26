import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Form, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../util/hooks";

function Signin(props) {
    // START Sign up Manually
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(signinUserCallback, {
        email: "",
        password: ""
    });

    const [signinUser, { loading }] = useMutation(SIGNIN_USER, {
        update(_, result) {
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
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
        update(_, result) {
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: token
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
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>Sign in to Food App</h1>
                <h3>
                    <a href="/signup">
                        <u> or sign up an account</u>
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
                            <Icon name="google" /> Sign in with Google
                        </Button>
                    )}
                    buttonText="Sign up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <div className="content">
                        <div className="header">
                            There was some errors with your submission
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
    );
}

const SIGNIN_USER = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

const SIGNIN_GOOGLE = gql`
    mutation signinGoogle($token: String!) {
        signinGoogle(token: $token) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export default Signin;
