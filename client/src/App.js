import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Foods from "./pages/Foods";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

// import { AuthProvider } from "./context/auth";

function App() {
    return (
        // <AuthProvider>
        <Router>
            <Container>
                <MenuBar />
                <Route exact path="/" component={Home} />
                <Route exact path="/foods" component={Foods} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
            </Container>
        </Router>
        // </AuthProvider>
    );
}

export default App;
