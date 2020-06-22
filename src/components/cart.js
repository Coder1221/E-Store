import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import Cartcolumns from './CartColumns';
import CartList from './CartList';

export default class cart extends Component {
    render() {
        return (
            <ProductConsumer>
            {value=>{
                if(value.cart.length>0){
                    return(
                        <React.Fragment>
                            <Cartcolumns />
                            <CartList value = {value}/>
                            <div className="row my-1 text-capitalize text-center">
                                <div className="col-10 mx-auto col-lg-2">
                                    <p><strong>Total Bill: {value.cartTotal}</strong></p>                                    
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }else{
                    return( 
                        <div className='mx-auto text-center text-blue'>
                            <h2><p className='mx-auto'>Empty cart</p></h2>
                        </div>
                    )
                }
            }}
            </ProductConsumer>
        )
    }
}