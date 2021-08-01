import './App.css';
import React from 'react';
import NavigationComponent from "./component/NavigationComponent";
import 'bootstrap/dist/css/bootstrap.css';
import {CategorizePageContainer} from "./component/CategorizePageComponent";
import {Col, Container, Row} from "react-bootstrap";
// import 'bootstrap/dist/js/bootstrap.js';
// import 'bootstrap/js/dist/dropdown';
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div>
            <NavigationComponent/>
            <Container style={{marginTop: "2%"}}>
                <Row>
                    <Col>
                        <CategorizePageContainer/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
