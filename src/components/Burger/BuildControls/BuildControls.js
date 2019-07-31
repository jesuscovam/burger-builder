import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  const buildControl = controls.map((ingredient, i) => (
    <BuildControl
      key={ingredient.label.concat(i)}
      label={ingredient.label}
      add={() => props.add(ingredient.type)}
      delete={() => props.delete(ingredient.type)}
      disabled={props.disabled[ingredient.type]}
    />
  ));
  const price = props.price > 0 ? props.price.toFixed(2) : 0;
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>{price}$</strong>
      </p>
      {buildControl}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        ORDER NOW
      </button>
    </div>
  );
};
export default buildControls;
