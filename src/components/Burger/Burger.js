import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./Burgeringredient/Burgeringredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>
      [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    )
    .reduce((acc, el) => acc.concat(el), []);
  const showIngredients =
    transformedIngredients.length > 0 ? (
      transformedIngredients
    ) : (
      <p>Please add more ingredients</p>
    );
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {showIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
