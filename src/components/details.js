import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';

export default class details extends Component {

    render() {
        return (
            <ProductConsumer>
            {value=>{

                const { id ,img , info, price, title, inCart}=value.details;

                return(
                <div className="container">
                        <div className="row">
                            <div className="mx-auto text-center text-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    
                        <div className="row">
                            <div className="mx-auto col-md-6 my-3">
                                <img src={img} className="img-fluid" alt="" />
                            </div>
                        </div>
                        
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <h4 className="text-blue">
                            <strong>
                              price : <span>RS</span>
                                 {price}
                            </strong>
                        </h4>
                    
                        <p className="text-capitalize font-weight-bold mt-3 mb-0">some info about product :</p>
                    
                        <p className="text-muted lead">{info}</p>
                            <Link to="/">
                                <button>back to products</button>
                            </Link>
                            <button cart disabled={inCart ? true : false}
                                onClick={() => {
                                    value.handleCart(id);
                                    value.model(id);
                                    console.log(value)
                                }}>
                                {inCart ? "in cart" : "add to cart"}
                            </button>
                    </div>
                </div>        
                )
            }}
            </ProductConsumer>
        )
    }
}