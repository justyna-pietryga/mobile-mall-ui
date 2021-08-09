import React from "react";
import {Accordion, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {connect} from "react-redux"
import _ from "lodash"
import {
    getCategory,
    clearCategories,
    getStandardCategories,
    addProduct,
    clearProducts
} from "../../redux/Categories/categories.actions"

class ProductFilterComponent extends React.Component {

    constructor() {
        super();
        this.onSearch = this.onSearch.bind(this)
        this.onChangeCategories = this.onChangeCategories.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.state = {
            categories: new Map()
        }
        let eventSource = undefined
        let categories = new Set();
        let listening = false;
    }

    componentDidMount() {
        const cat = new Map()
        this.props.standardCategories.forEach((obj) => {
            cat.set(obj.id, false)
        })
        this.setState({
            categories: cat
        })
    }

    onChangeCategories(event) {
        console.log(`categories: ${event.target.value}`)
        console.log(`categories id: ${event.target.id}`)
        const categoriesFromState = this.state.categories
        categoriesFromState.set(event.target.id, event.target.checked)
        this.setState({categories: categoriesFromState})
        console.log(`categories state: ${this.state.categories.get(event.target.id)}`)
        console.log(`categories state2: ${this.state.categories}`)
    }

    onSearch() {
        const filtered = [...this.state.categories]
            .filter(([k, v]) => {
                console.log(`wtf key: ${k}`)
                console.log(`wtf value: ${v}`)
                return v === true
            })
        const requestedIds = [...filtered.values()].map(arr => arr[0])

        if (!this.listening) {
            this.eventSource = new EventSource(`http://localhost:8080/api/products/byStandardCategoryIds?standardCategoryIds=${requestedIds}`);

            this.eventSource.onopen = (event) => {
                console.log("connection opened")
                this.props.clearProducts()
            }

            this.eventSource.onmessage = (event) => {
                const {categories} = this.props
                this.props.addProduct(JSON.parse(event.data))
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

    render() {
        const {standardCategories} = this.props

        return (
            <Container style={{marginTop: "2%", width: "100%", marginBottom: "2%"}}>
                <Row>
                    <Button size="sm"
                            variant="outline-dark"
                            style={{marginBottom: "2%"}}
                            onClick={this.onSearch}> Search
                    </Button>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Choose category </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Form onChange={this.onChangeCategories}>
                                        <div key={'categories-filter'} className="mb-3">
                                            {standardCategories.map(category => (
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`${category['standardCategory_id']}`}
                                                    label={`${category.name}`}
                                                />
                                            ))}
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Choose size </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Form>
                                        <div key={'size-filter'} className="mb-3">
                                            {["XS", "S", "M", "L", "XL"].map(size => (
                                                <Form.Check
                                                    type="checkbox"
                                                    id={size}
                                                    label={size}
                                                />
                                            ))}
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        standardCategories: state.categories.standardCategories
    }
}
const mapDispatchToProps =
    {
        getCategory, clearCategories, getStandardCategories, addProduct, clearProducts
    }
;

export const ProductFilterContainer = connect(mapStateToProps, mapDispatchToProps)(ProductFilterComponent);