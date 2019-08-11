import React, { Component } from "react";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "Your Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "ZIP"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeHolder: "Your email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Express" },
            { value: "regular", display: "Regular" }
          ]
        },
        value: ""
      }
    },
    deliveryMethod: null,
    loading: false
  };

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  submitHandler = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    try {
      const post = await axios.post("/order.json", order);
      this.setState({ loading: false });
      this.props.history.push("/");
      console.log(post);
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  render() {
    let form = (
      <form>
        <Input elementType="..." value="..." elementConfig="..." />
        <Input type="email" name="email" placeholder="Your Mail" />
        <Input type="text" name="street" placeholder="Your Street" />
        <Input type="text" name="postal" placeholder="Your Postal Code" />
        <Button btnType="Success" click={this.submitHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Add your info</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
