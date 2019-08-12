import React from "react";
import { withRouter } from "react-router-dom";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you'll like it!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={() => props.history.goBack()}>
        CANCEL
      </Button>
      <Button
        btnType="Success"
        click={() => props.history.replace("/checkout/contact-data")}
      >
        CONTINUE
      </Button>
    </div>
  );
};
export default withRouter(checkoutSummary);
