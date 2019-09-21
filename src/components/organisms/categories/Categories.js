import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../../redux/actions/categories'
import Category from '../../molecules/category/Category';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import './Categories.css';

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            add : false,
            edit: false,
            newDescriptionCategory: '',
            idCategory: 0,
        }

        this.onChangeCategoryName = this.onChangeCategoryName.bind();
        this.addCategory = this.addCategory.bind()
        this.deleteCategory = this.deleteCategory.bind()
        this.updateCategory = this.updateCategory.bind()
    }

    componentDidMount(){
        this.props.getCategories();
    }

    showAddCategory = () => {
        this.setState({add: !this.state.add, edit: false})
    }

    showEditCategory = (category) => {
        this.setState({edit: true, idCategory: category.id , newDescriptionCategory: category.description, add: false});
    }

    onChangeCategoryName = (e) => {
        this.setState({ newDescriptionCategory: e.target.value });
    }
    
    addCategory = () => {
        this.props.addCategory(this.state.newDescriptionCategory)
    }

    deleteCategory = (id) => {
        this.props.deleteCategory(id);
    }
    
    updateCategory = () => {
        this.props.updateCategory(this.state.idCategory, this.state.newDescriptionCategory)
    }

    render() {
        const { categories, loading, list } = this.props;
        const { add, edit, newDescriptionCategory } = this.state;
        const listCategories = categories &&  categories !== undefined? categories.map(category =>{
            if(list) {
                return <li key={category.id}><Category description={category.description} /></li>
            } else {
                return (
                    <tr key={category.id}>
                        <td>{category.description}</td>
                        <td><Button text="Borrar" onClick={() => this.deleteCategory(category.id)}/></td>
                        <td><Button text="Editar" onClick={() => this.showEditCategory(category)}/></td>
                    </tr>
                )
            }
        }) : ''
        return (
            <div className='categories-component'>
                {list ?
                    <div className='categories-list'>
                        <ul className='list'>
                            {listCategories}
                        </ul>
                    </div>
                    :
                    <div className='categories-table'>
                        <div className='table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Categorias</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading?
                                        <tr><td>Cargando...</td></tr>
                                        : listCategories
                                    }
                                </tbody>
                            </table>
                            <Button text='Agregar Categoria' onClick={this.showAddCategory} />
                        </div>
                        {add &&
                            <div className='category'>
                                <h1>Add Category:</h1>
                                <TextField id='txtAdd' text='Nombre de la categoria:  ' onChange={this.onChangeCategoryName} />
                                <Button text='Agregar' onClick={this.addCategory} />
                            </div>
                        }
                        {edit &&
                            <div className='category'>
                                <h1>Edit Category: {newDescriptionCategory.description}</h1>
                                <TextField id='txtEdit' text='Nuevo nombre de la categoria:  ' onChange={this.onChangeCategoryName}/>
                                <Button text='Modificar' onClick={this.updateCategory} />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.categories.loading,
        categories: state.categories.categories,
        category: state.categories.category,
        err: state.categories.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategory: description => dispatch(addCategory(description)),
        deleteCategory: id => dispatch(deleteCategory(id)),
        updateCategory: (id, newDescription) => dispatch(updateCategory(id, newDescription))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);