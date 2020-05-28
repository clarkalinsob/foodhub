import React, { useContext, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Button, Divider, Form, Icon, Segment } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'
import { SIGNUP_GOOGLE, SIGNUP_USER } from '../util/graphql'
const { GOOGLE_CLIENT_ID } = require('../config')

function Signup(props) {
  // START Sign up Manually
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(signupUserCallback, {
    givenName: '',
    familyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    variables: values,
    update(_, { data: { signup: userData } }) {
      context.signin(userData)
      props.history.push('/')
    },
    onError(err) {
      if (err.graphQLErrors.length > 0) setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }
  })

  function signupUserCallback() {
    signupUser()
  }

  // END Sign up Manually

  // START Sign up with Google
  const [token, setToken] = useState({
    token: ''
  })

  const [signupGoogle] = useMutation(SIGNUP_GOOGLE, {
    variables: token,
    update(_, { data: { signupGoogle: userData } }) {
      context.signin(userData)
      props.history.push('/')
    },
    onError(err) {
      if (err.graphQLErrors.length > 0) setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }
  })

  const responseGoogle = ({ tokenId }) => {
    setToken({
      token: tokenId
    })

    signupGoogle()
  }
  // END Sign up with Google

  return (
    <div className="form-container">
      <Segment>
        <div className="segment">
          <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Create a Foodhub Account</h1>
            <h3>
              <a href="/signin">
                <u> or sign in to your account</u>
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
          </Form>
          <Divider horizontal>Or</Divider>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button fluid primary onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <Icon name="google" /> Sign up with Google
              </Button>
            )}
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <div className="content">
                <div className="header">There was some errors with your submission</div>
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
          <div />
        </div>
      </Segment>
    </div>
  )
}

export default Signup
