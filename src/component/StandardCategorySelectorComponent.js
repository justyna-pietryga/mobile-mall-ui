import React from "react";
import {Form} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory} from "../redux/Categories/categories.actions"
import {MenuItem, NativeSelect, Select, Input} from "@material-ui/core";

class StandardCategorySelectorComponent extends React.Component {

    constructor() {
        super();
        this.updateStandardCategory = this.updateStandardCategory.bind(this)
        this.state = {
            value: ''
        }
    }

    updateStandardCategory(event){
        console.log("value changed: " + event.target.value)
        this.setState({value: event.target.value});
        this.props.updateStandard(event.target.value)
        console.log("this.state: " + this.state.value)
    }

    render() {
        const {standardCategories} = this.props
        return (
            <div>
                <NativeSelect id={`${this.props.id}`} onChange={this.updateStandardCategory} value={this.state.value} defaultValue="">
                    <option value="">Default</option >
                    {standardCategories ? standardCategories.map((cat, index) =>
                        <option value={cat.name}>{cat.name}</option >) : ''}
                </NativeSelect>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        standardCategories: state.categories.standardCategories
    }
};
const mapDispatchToProps = {getCategory};

export const StandardCategorySelectorContainer = connect(mapStateToProps, mapDispatchToProps)(StandardCategorySelectorComponent);