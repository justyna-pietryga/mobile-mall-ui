import React from "react";
import {Button, Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, clearCategories, getStandardCategories} from "../redux/Categories/categories.actions"
import {CategoriesTableContainer} from "./categorization/CategoriesTableComponent";
import {TextField} from "@material-ui/core";
import {NewCategoryContainer} from "./categorization/NewCategoryComponent";

class CategorizePageComponent extends React.Component {

    constructor() {
        super();
        this.state = {data: {}, categoriesWithStandard: new Map()}
        this.getCategories = this.getCategories.bind(this)
        this.newCategoryOnChange = this.newCategoryOnChange.bind(this)
        this.addCategoryWithStandard = this.addCategoryWithStandard.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        let eventSource = undefined
        let categories = new Set();
        let listening = false;
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/categorisation/all-standard-categories")
            .then(res => res.json())
            .then(json => this.props.getStandardCategories(json));
    }

    newCategoryOnChange(event) {
        console.log(`new category ${event.target.value}`)
    }

    addCategoryWithStandard(category) {
        const categoriesMap = this.state.categoriesWithStandard
        if (categoriesMap.has(category.name)) {
            console.log(`update ${category.name}`)
            categoriesMap.set(category.name, category)
        } else {
            console.log(`adding new ${category.name}`)
            categoriesMap.set(category.name, category)
        }
        console.log(`result ${categoriesMap.get(category.name)}`)
    }

    getCategories() {
        if (!this.listening) {
            this.eventSource = new EventSource("http://localhost:8080/api/categorisation/categories");

            this.eventSource.onopen = (event) => {
                console.log("connection opened")
                this.props.clearCategories()
            }

            this.eventSource.onmessage = (event) => {
                const {categories} = this.props
                this.props.getCategory(JSON.parse(event.data))
            }

            this.eventSource.onerror = (event) => {
                console.log(event.target.readyState)
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log('eventsource closed (' + event.target.readyState + ')')
                }
                this.listening = false;
                this.eventSource.close();
            }

            this.listening = true;
        }

        return () => {
            this.eventSource.close();
            console.log("eventsource closed")
        }
    }

    onSubmit() {
        const {categories} = this.props;

        return fetch('http://localhost:8080/api/categorisation/save-categories', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            // credentials: "same-origin",
            // method: 'post',
            body: JSON.stringify(categories)
        })
            .then(response => response.json())
            .then(response => console.log(response))
        // const {value} = this.state
        // this.props.addStandardCategory(value)
    }

    render() {
        return (
            <Container style={{marginTop: "2%"}}>
                <Row>
                    <Col>
                        <div>
                            <Container style={{marginBottom: "1%"}}>
                                <Row>
                                    <Col>
                                        <NewCategoryContainer/>
                                    </Col>
                                    <Col>
                                        <Button style={{width: "100%"}} variant="dark" onClick={this.onSubmit}
                                                size="sm">
                                            Save standardization
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                            <CategoriesTableContainer addCategory={this.addCategoryWithStandard}/>
                            <Button variant="dark" style={{width: "100%"}} onClick={this.getCategories}>Get
                                categories</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
    }
}
const mapDispatchToProps =
    {
        getCategory, clearCategories, getStandardCategories
    }
;

export const CategorizePageContainer = connect(mapStateToProps, mapDispatchToProps)(CategorizePageComponent);