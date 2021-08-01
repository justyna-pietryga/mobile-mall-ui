import React from "react";
import {Button, Form, Table} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, updateCategoryWithStandardInformation} from "../redux/Categories/categories.actions"
import {StandardCategorySelectorContainer} from "./StandardCategorySelectorComponent";
import {MenuItem, Select} from "@material-ui/core";

class CategoryRowComponent extends React.Component {

    constructor() {
        super();
        this.updateStandardInformation = this.updateStandardInformation.bind(this)
        this.state = {
            name: '',
            url: '',
            shop: '',
            standardCategory: {}
        }
    }

    componentDidMount() {
        const {item} = this.props
        this.setState({name: item.name})
        this.setState({url: item.url})
        this.setState({shop: item.shop})
    }

    updateStandardInformation(standardName) {
        console.log(`standard name: ${standardName}`)
        this.setState(prev => ({
            standardCategory: {
                ...prev.standardCategory,
                name: standardName
            }
        }))
        console.log(`standard info: ${this.state.standardCategory.toString()}`)
        console.log(`standard info2: ${this.state.standardCategory.name}`)

        this.props.updateCategoryWithStandardInformation({
            name: this.state.name,
            url: this.state.url,
            shop: this.state.shop,
            standardCategory: {
                name: standardName
            }
        })
    }

    render() {
        const {item, index, categories} = this.props
        return (
            <tr key={index}>
                <td>{index}</td>
                <td><a href={item.url}>{item.name}</a></td>
                <td>{item.shop}</td>
                <td>
                    <StandardCategorySelectorContainer
                        id={index}
                        updateStandard={this.updateStandardInformation}/>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    }
};
const mapDispatchToProps = {getCategory, updateCategoryWithStandardInformation};

export const CategoryRowContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryRowComponent);