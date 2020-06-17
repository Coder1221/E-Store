import React,{Component} from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import Navbar from './components/navbar';
import List from './components/list';
import Details from './components/details';
import Cart from './components/cart';
import Model from './components/model'

class App extends Component {
  render(){
    return (
      <React.Fragment>
       <Navbar/>
       <Switch>
        <Route exact path='/' component={List}/>
        <Route path="/cart" component={Cart} />
        <Route path="/details" component={Details} />
       </Switch>
       <Model />
      </React.Fragment>
    );
  }
}
export default App;