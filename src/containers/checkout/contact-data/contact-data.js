import React, { Component } from 'react';

import Button from '../../../components/layout/button/button';
import classes from './contact-data.scss';

class ContactData extends Component {
  state = {
    name: '',
    emai: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Name" />
          <input className={classes.Input} type="email" name="email" placeholder="E-mail" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postalCode" placeholder="Postal code" />
          <br />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;