import React from "react";
import {Button, Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, clearCategories, getStandardCategories} from "../redux/Categories/categories.actions"
import {ProductFilterContainer} from "./products/ProductFilter";
import {ProductContainer} from "./products/ProductComponent";
import {ProductsContainer} from "./products/ProductsComponent";

class ProductsPageComponent extends React.Component {

    constructor() {
        super();
        // this.onChangeCategories = this.onChangeCategories.bind(this)
        this.state = {
            categories: new Map
        }
    }

    componentDidMount() {
        const cat = new Map()
        this.props.standardCategories.forEach((obj) => {
            cat.set(obj.id, false)
        })
        this.setState({
            categories: cat
        })
        // this.setState({
        //     categories: this.props.standardCategories.reduce((map, obj) => {
        //         cat.set(obj.id, false)
        //         map[obj.id] = false;
        //         return map;
        //     }, {})
        // })
        fetch("http://localhost:8080/api/categorisation/all-standard-categories")
            .then(res => res.json())
            .then(json => this.props.getStandardCategories(json));
    }

    onChangeCategories(event) {
        // console.log(`categories: ${this.state.categories}`)
        // console.log(`categories: ${event.target.value}`)
        // const categoriesFromState = this.state.categories
        // categoriesFromState.set(event.target.id, event.target.checked)
        // // categoriesFromState[event.target.id] = event.target.checked
        // this.setState({categories: categoriesFromState})
        // console.log(`categories state: ${this.state.categories.get(event.target.id)}`)
        // console.log(`categories state2: ${this.state.categories}`)
    }
    //TODO map those which have true

    render() {
        return (
            <Container fluid style={{marginTop: "2%", marginLeft: "0%", width: "100%"}}>
                <Row>
                    <Col lg={3}>
                        <ProductFilterContainer onChangeCategories={this.onChangeCategories}/>
                    </Col>
                    <Col lg={9}>
                        <ProductsContainer/>
                    </Col>
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
        getCategory, clearCategories, getStandardCategories
    }
;

export const ProductsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsPageComponent);