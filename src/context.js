import React, { Component } from 'react';
const  ProductContext = React.createContext();
//provider ,Consumer
class ProductProvider extends Component {
    state = {
        products : [], 
        detailProduct : [],
        model_open : false,
        model_product : [],
        cart : [],
        cartTotal : 0,
        deieveryCharges : 0,
        user_id: 'Fb Login',
        button_dis :false,
        unique_id:''
    }
    
    componentDidMount() {
        fetch('https://apimar.herokuapp.com/items')
        .then(res => res.json())
        .then(json => this.setState({ products: json }));
    }

    
    modelopen=id=>{
        const product = this.getitem(id);
        this.addtocart(id);
        this.setState(()=>{
            return{model_product : product , model_open:true}
        });

    }

    
    closeModel=()=>{
        this.setState(()=>{
            return{model_open:false};
        });
    }

    handleDetail = id => {
        const product = this.getitem(id);
        this.setState(() => {
          return { detailProduct: product };
        });
    };
    

    
    getitem=(id)=>{
        return this.state.products.find(item=>item.id === id)
    }

    
    addtocart = async (id) =>{
        // api call
        if(this.state.unique_id!==''){
            try{
                await fetch('https://apimar.herokuapp.com/update',{
                    method: 'post',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "id":this.state.unique_id,
                    "method":"cart",
                    "post_id":id
                })
            }).then(function(response){
                    return response.json()
                }).then(function(data){
                    console.log(data)
                })
            }catch(err){
                console.log(err)
            }
        }

        // console.log('called')    
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getitem(id));
        const product = tempProduct[index];
        product.inCart=true;
        product.count=1;
        product.total = product.price;
        this.setState(()=>{
            return {products:tempProduct , cart:[...this.state.cart ,product]}
        },this.getTotals);
    }



    responseFacebook = async (response) => {
        var x = []
        var y = []
        try{
            await fetch('https://apimar.herokuapp.com/user',{
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name":response['name'],
                    "id":response['id'],
                    "userID":response['userID']
            })
        }).then(function(response){
                return response.json()
            }).then(function(data){
                x=data[0]['cart']
                y=data[0]['likes']
            
            })
        }catch(err){
            console.log(err)
        }
        if(x.length){
            x.map(this.addtocart)
            y.map(this.like)
        }

        this.setState(()=>{
            return{user_id : response['name'] ,button_dis:true,unique_id:response['userID'] } 
        })
    }
    
    removeitem = (id)=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        const index = tempProducts.indexOf(this.getitem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        this.setState(() => {
            return {
            cart: [...tempCart],
            products: [...tempProducts]
            };
        }, this.getTotals);
    }

    increment = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
            cart: [...tempCart]
            };
        }, this.getTotals);
    }

    decrement =  (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
          return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
          this.removeitem(id);
        } else {
          product.total = product.count * product.price;
          this.setState(() => {
            return { cart: [...tempCart] };
          }, this.getTotals);
        }

    }

    getTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const total = subTotal + this.state.deieveryCharges;
        this.setState(()=>{
            return {cartTotal:total};
        })
    };

    like = async(id)=>{

        if(this.state.unique_id===''){      
            let tempProduct = [...this.state.products];
            const index = tempProduct.indexOf(this.getitem(id));
            tempProduct[index].like=true;
            // console.log(tempProduct)
            this.setState(()=>{
                return{products:tempProduct}
            })
        }else{        
            try{
                await fetch('https://apimar.herokuapp.com/update',{
                    method: 'post',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "id":this.state.unique_id,
                    "method":"like",
                    "post_id":id
                })
            }).then(function(response){
                    return response.json()
                }).then(function(data){
                    console.log(data)

                })
            }catch(err){
                console.log(err)
            }

        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getitem(id));
        tempProduct[index].like=true;
        // console.log(tempProduct)
        this.setState(()=>{
            return{products:tempProduct}
        })
    }


    }


    render() {
        return (
            <ProductContext.Provider value={{
            ...this.state,
            handleDetail: this.handleDetail,
            handleCart :this.addtocart,
            model:this.modelopen,
            cmodel :this.closeModel,
            inc :this.increment,
            dec : this.decrement,
            ccart : this.clearCart,
            ritem : this.removeitem,
            responseFacebook:this.responseFacebook,
            like :this.like
             }}>
            {this.props.children}
            </ProductContext.Provider>
        )
    }
}



const ProductConsumer = ProductContext.Consumer;
export {ProductProvider ,ProductConsumer};