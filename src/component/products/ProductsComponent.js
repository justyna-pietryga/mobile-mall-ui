import React from "react";
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, clearCategories, getStandardCategories} from "../../redux/Categories/categories.actions"
import {ProductContainer} from "./ProductComponent"

class ProductsComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {products} = this.props

        return (
            <div style={{marginTop: "2%", marginLeft: "0%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {products.length > 0 ?
                    products.map(product => {
                        return <ProductContainer product={product}/>
                    }) : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.categories.products,
    }
}
const mapDispatchToProps =
    {
        getCategory, clearCategories, getStandardCategories
    }
;

export const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);