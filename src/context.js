import React, { Component } from 'react'
import {storeProducts , detailProduct} from './data';


const  ProductContext = React.createContext();
//provider ,Consumer
class ProductProvider extends Component {
    state ={
        products : storeProducts, 
        details : detailProduct
    }
    handleDetails = ()=>{
        console.log('Detail handler')
    }
    addtocart = () =>{
        console.log('cart method')
    }
    render() {
        return (
            <ProductContext.Provider value={{
            ...this.state,
            handleDetail : this.handleDetails,
            handleCart :this.addtocart
             }}>
            {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider ,ProductConsumer};