import React from "react";
import {Button, Form, Table} from 'react-bootstrap';
import {connect} from "react-redux"
import {getCategory, addStandardCategory} from "../../redux/Categories/categories.actions"
import {StandardCategorySelectorContainer} from "./StandardCategorySelectorComponent";
import {MenuItem, Select} from "@material-ui/core";
import {CategoryRowContainer} from "./CategoryRowComponent";

class CategoriesTableComponent extends React.Component {

    constructor() {
        super();
        // this.updateStandardInformation = this.updateStandardInformation.bind(this)
        this.state = {
            category: {
                name: '',
                url: '',
                shop: '',
                standardCategory: {}
            }
        }
    }

    render() {
        const {categories} = this.props
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Category name</th>
                    <th>Shop</th>
                    <th>Standard Category</th>
                </tr>
                </thead>
                <tbody>
                {!Array.isArray(categories) ? <tr>
                        <td>'No data'</td>
                    </tr> :
                    categories.map((item, index) => (
                        <CategoryRowContainer item={item} index={index} />
                        // <tr key={index}>
                        //     <td>{index}</td>
                        //     <td><a href={item.url}>{item.name}</a></td>
                        //     <td>{item.shop}</td>
                        //     <td>
                        //         <StandardCategorySelectorContainer
                        //             id={index}
                        //             updateStandard={this.updateStandardInformation}/>
                        //     </td>
                        // </tr>
                    ))
                }
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    }
};
const mapDispatchToProps = {getCategory};

export const CategoriesTableContainer = connect(mapStateToProps, mapDispatchToProps)(CategoriesTableComponent);