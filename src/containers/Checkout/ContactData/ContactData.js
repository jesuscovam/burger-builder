import React, { Component } from "react";
import axios from 'axios';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    customer: null,
    deliveryMethod: null,
    loading: false
  };
  submitHandler = event => {
    event.preventDefault();
     this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Jesus Cova",
        address: {
          street: "Calle del fuego",
          zipCode: 77710,
          country: "Mexico"
        },
        email: "jesuscovam@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    try {
      const post = await axios.post("/order.json", order);
      console.log(post);
      this.setState({ loading: false, purchasing: false });
    } catch (error) {
      this.setState({ loading: false, purchasing: false });
      console.log(error);
    }
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Add your info</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Mail" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postal" placeholder="Your Postal Code" />
          <Button btnType="Success" click={this.submitHandler}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
