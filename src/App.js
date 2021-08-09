import './App.css';
import React from 'react';
import NavigationComponent from "./component/NavigationComponent";
import 'bootstrap/dist/css/bootstrap.css';
import {CategorizePageContainer} from "./component/CategorizePageComponent";
import {ProductsPageContainer} from "./component/ProductsPageComponent";
import {Col, Container, Row} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <NavigationComponent/>
                <Route path="/products" component={ProductsPageContainer}/>
                <Route path="/categorization" component={CategorizePageContainer}/>
                {/*<CategorizePageContainer/>*/}
            </Router>
        </div>
    );
}

export default App;
