import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchasable: false,
    totalPrice: 4,
    purchasing: false
  };

  updatePurchase = nextIngredients => {
    const purchasableQtty = Object.keys(nextIngredients)
      .map(igKey => nextIngredients[igKey])
      .reduce((acc, el) => acc + el, 0);

    this.setState({ purchasable: purchasableQtty > 0 });
  };

  addIngredient = type => {
    const oldQtty = this.state.ingredients[type];
    const newQtty = oldQtty + 1;

    const nextIngredients = { ...this.state.ingredients };
    nextIngredients[type] = newQtty;

    const prevPrice = this.state.totalPrice;
    const nextPrice = prevPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: nextIngredients, totalPrice: nextPrice });
    this.updatePurchase(nextIngredients);
  };

  deleteIngredient = type => {
    const oldQtty = this.state.ingredients[type];
    if (oldQtty <= 0) {
      return;
    }
    const newQtty = oldQtty - 1;
    const nextIngredients = { ...this.state.ingredients };
    nextIngredients[type] = newQtty;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENTS_PRICE[type];
    this.setState({ ingredients: nextIngredients, totalPrice: newPrice });
    this.updatePurchase(nextIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    alert("Thank you!/ Gracias!/ Danke!/ Merci!/ Arigato!");
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelPurchase={this.cancelPurchaseHandler}
        >
          <OrderSummary
            total={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredient}
          delete={this.deleteIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
