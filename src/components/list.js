import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Product from './Product';
import styled from "styled-components";

export default class list extends Component {
    render() {
        return (
            <React.Fragment>
              <ProductWrapper className="py-4">
                <div className="row">
                <ProductConsumer>
                     {value =>{
                        return value.products.map(product=>{
                            return <Product key={product.id} product ={product}/>
                        })
                    }}
                </ProductConsumer>
                </div>
              </ProductWrapper>
            </React.Fragment>
        )
    }
}
const ProductWrapper = styled.section``;