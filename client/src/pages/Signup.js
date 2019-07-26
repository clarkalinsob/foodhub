import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Form, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Signup(props) {
    // START Sign up Manually
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        givenName: "",
        familyName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    const onSubmit = event => {
        event.preventDefault();
        addUser();
    };
    // END Sign up Manually

    // START Sign up with Google
    const [token, setToken] = useState({
        token: ""
    });

    const [signupGoogle] = useMutation(SIGN_UP_GOOGLE, {
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

        signupGoogle();
    };
    // END Sign up with Google

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>Register to Food App</h1>
                <h3>
                    <a href="/signin">
                        <u> or log in to your account</u>
                    </a>
                </h3>
                <br />
                <Form.Input
                    label="Given Name"
                    placeholder="e.g., Clark, Egbert"
                    name="givenName"
                    type="text"
                    value={values.givenName}
                    error={errors.givenName ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Family Name"
                    placeholder="e.g., Alinsob, Tagalog"
                    name="familyName"
                    type="text"
                    value={values.familyName}
                    error={errors.familyName ? true : false}
                    onChange={onChange}
                />
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="e.g., &#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button fluid type="submit" positive>
                    Register
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
                            <Icon name="google" /> Sign up with Google
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

const REGISTER_USER = gql`
    mutation signup(
        $givenName: String!
        $familyName: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        signup(
            registerInput: {
                givenName: $displayName
                familyName: $familyName
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

const SIGN_UP_GOOGLE = gql`
    mutation signupGoogle($token: String!) {
        signupGoogle(token: $token) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export default Signup;
