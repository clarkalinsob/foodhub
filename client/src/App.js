import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import VerticalMenu from "./components/VerticalMenu";
import Home from "./pages/Home";
import Menus from "./pages/Menus";
import Foods from "./pages/Foods";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SingleFood from "./pages/SingleFood";

import { AuthProvider } from "./context/auth";
import { AuthRoute, ProtectedRoute } from "./util/AuthRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <MenuBar />
                <Container>
                    <VerticalMenu />
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute exact path="/menus" component={Menus} />
                    <ProtectedRoute exact path="/foods" component={Foods} />
                    <AuthRoute exact path="/signin" component={Signin} />
                    <AuthRoute exact path="/signup" component={Signup} />
                    <Route exact path="/foods/:foodId" component={SingleFood} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
