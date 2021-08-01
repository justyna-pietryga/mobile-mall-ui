import React from "react";
import {Col, Container, Row, Button} from 'react-bootstrap';
import {connect} from "react-redux"
import {addStandardCategory} from "../redux/Categories/categories.actions"
import {TextField} from "@material-ui/core";

class NewCategoryComponent extends React.Component {

    constructor() {
        super();
        this.newCategoryOnChange = this.newCategoryOnChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            value: ''
        }
    }

    newCategoryOnChange(event) {
        this.setState({value: event.target.value})
    }

    onSubmit() {
        const {value} = this.state
        this.props.addStandardCategory(value)
    }

    render() {
        const {standardCategories} = this.props
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <TextField
                                id="outlined-secondary"
                                label="Type new standard category"
                                variant="outlined"
                                color="default"
                                onChange={this.newCategoryOnChange}
                                size="small"
                                style={{width: "100%"}}
                            />
                        </Col>
                        <Col>
                            <Button style={{width: "100%"}} variant="outline-dark" onClick={this.onSubmit} size="sm">
                                Accept new standard category
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        standardCategories: state.categories.standardCategories
    }
};
const mapDispatchToProps = {addStandardCategory};

export const NewCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(NewCategoryComponent);