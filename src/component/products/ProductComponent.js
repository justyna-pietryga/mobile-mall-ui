import React from "react";
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, clearCategories, getStandardCategories} from "../../redux/Categories/categories.actions"

class ProductComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {product} = this.props

        return (
            <div style={{marginTop: "2%", marginLeft: "0%"}}>
                 {/*<Col md={2}>*/}
                 {/*<img src={product.imgUrl} style={{width: "18%"}}/>*/}
                <Card style={{width: '18rem', marginRight: "1%"}}>
                    <Card.Img variant="top" src={product.imgUrl}/>
                    <Card.Body>
                        <Card.Title><a href={product.url}>{product.name}</a></Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                 {/*</Col>*/}
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

export const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductComponent);