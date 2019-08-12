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
          placeholder: "Your Name"
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
          placeholder: "Your Email"
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
    deliveryMethod: "express",
    loading: false
  };

  changedInputHandler = (e, value) => {
    let orderForm = this.state.orderForm;
    switch (value) {
      case "Your Name":
        orderForm["name"].value = e.target.value;
        this.setState({ orderForm });
        break;

      case "Your Street":
        orderForm["street"].value = e.target.value;
        this.setState({ orderForm });
        break;

      case "ZIP":
        orderForm["zipCode"].value = e.target.value;
        this.setState({ orderForm });
        break;

      case "Country":
        orderForm["country"].value = e.target.value;
        this.setState({ orderForm });
        break;

      case "Your Email":
        orderForm["email"].value = e.target.value;
        this.setState({ orderForm });
        break;

      case "select":
        console.log(e.target.value);
        this.setState({ deliveryMethod: e.target.value });
        break;

      // select in Input.js
      default:
        this.setState({ deliveryMethod: e.target.value });
        break;
    }
  };

  submitHandler = async event => {
    event.preventDefault();
    let customerData = {};
    Object.keys(this.state.orderForm).map(
      key => (customerData[key] = this.state.orderForm[key].value)
    );
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerData,
      deliveryMethod: this.state.deliveryMethod
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
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
        {formElements.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              value={formElement.value}
              elementConfig={formElement.config.elementConfig}
              changed={this.changedInputHandler}
            />
          );
        })}
        <Button btnType="Success">Order</Button>
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
