import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import MenuBar from './components/MenuBar'
import VerticalMenuBar from './components/VerticalMenuBar'
// import Home from "./pages/Home";
import Users from './pages/Users'
import Meals from './pages/Meals'
import Foods from './pages/Foods'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SingleMeal from './pages/SingleMeal'
import SingleFood from './pages/SingleFood'
import UserProfile from './pages/UserProfile'

import { AuthProvider } from './context/auth'
import { AuthRoute, ProtectedRoute } from './util/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <VerticalMenuBar />
          <Route exact path='/' component={Signin} />
          <ProtectedRoute exact path='/meals' component={Meals} />
          <ProtectedRoute exact path='/foods' component={Foods} />
          <ProtectedRoute exact path='/users' component={Users} />
          <ProtectedRoute exact path='/meals/:mealId/' component={SingleMeal} />
          <ProtectedRoute exact path='/foods/:foodId' component={SingleFood} />
          <ProtectedRoute exact path='/users/:email' component={UserProfile} />
          <AuthRoute exact path='/signin' component={Signin} />
          <AuthRoute exact path='/signup' component={Signup} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
