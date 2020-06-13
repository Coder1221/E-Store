import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Product from './Product';

export default class list extends Component {
    render() {
        return (
            <React.Fragment>
                <ProductConsumer>
                     {value =>{
                        return value.products.map(product=>{
                            return <Product key={product.id} product ={product}/>
                        })
                    }}
                </ProductConsumer>
            </React.Fragment>
        )
    }
}