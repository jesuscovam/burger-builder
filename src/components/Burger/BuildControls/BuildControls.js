import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControl = controls.map(ingredient => (
  <BuildControl key={ingredient.label} label={ingredient.label} />
));

const buildControls = props => (
  <div className={classes.BuildControls}>{buildControl}</div>
);
export default buildControls;
