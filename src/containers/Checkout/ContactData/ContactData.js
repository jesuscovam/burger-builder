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
          placeholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "express", display: "Express" },
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
    let customerValues = {};
    Object.keys(this.state.orderForm).map(
      key => (customerValues[key] = this.state.orderForm[key].value)
    );
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerData: customerValues
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

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedEvent = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedEvent.value = e.target.value;

    updatedOrderForm[inputIdentifier] = updatedEvent;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(elementArray => (
          <Input
            key={elementArray.id}
            elementType={elementArray.config.elementType}
            elementConfig={elementArray.config.elementConfig}
            value={elementArray.config.value}
            changed={e => this.inputChangeHandler(e, elementArray.id)}
          />
        ))}
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
