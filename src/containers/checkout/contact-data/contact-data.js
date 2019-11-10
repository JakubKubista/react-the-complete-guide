import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/layout/button/button';
import Spinner from '../../../components/layout/spinner/spinner';
import Input from '../../../components/layout/form/input/input';

import classes from './contact-data.scss';

class ContactData extends Component {
  state = {
    name: '',
    emai: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Jakub',
        address: {
          city: 'Oslo',
          country: 'Norway'
        },
        age: 25,
        deliveryMethod: 'fast'
      }
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }

  render () {
    let form = (<form>
      <Input inputtype="input" type="text" name="name" placeholder="Name" />
      <Input inputtype="input" type="email" name="email" placeholder="E-mail" />
      <Input inputtype="input" type="text" name="street" placeholder="Street" />
      <Input inputtype="input" type="text" name="postalCode" placeholder="Postal code" />
      <br />
      <Button btnType="Success" click={this.orderHandler}>ORDER</Button>
    </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;