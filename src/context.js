import React, { Component } from 'react'
import {storeProducts , detailProduct} from './data';
const  ProductContext = React.createContext();
//provider ,Consumer
class ProductProvider extends Component {
    state ={
        products : storeProducts, 
        details : detailProduct,
        model_open : false,
        model_product : []
    }

    modelopen=id=>{
        const product = this.getitem(id);
        this.setState(()=>{
            return{model_product : product , model_open:true}
        });
    }

    closeModel=()=>{
        this.setState(()=>{
            return{model_open:false};
        });
    }

    
    handleDetails = (id)=>{
        console.log('feeling cute might delete after')
    }


    getitem=(id)=>{
        return this.state.products.find(item=>item.id === id)
    }

    addtocart = (id) =>{
        const product = this.getitem(id);
        // console.log(product)

    }
    render() {
        return (
            <ProductContext.Provider value={{
            ...this.state,
            handleDetail : this.handleDetails,
            handleCart :this.addtocart,
            model:this.modelopen,
            cmodel :this.closeModel
             }}>
            {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider ,ProductConsumer};