import React from "react";
import Aux from "../../../hoc/Aux/Aux";

import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredients}</ul>
      <p>
        Total: <strong>${props.total.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" click={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType="Success" click={props.continuePurchase}>
        CHECKOUT
      </Button>
    </Aux>
  );
};

export default orderSummary;
