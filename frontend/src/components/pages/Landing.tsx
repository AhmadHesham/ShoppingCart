import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core";
import Item, { ItemType } from "../cards/Item";
import axios from "axios";

export interface LandingProps {}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Landing(): ReactElement | null {
  const classes = useStyles();
  const [state, setState] = React.useState(Array<ItemType>());
  const array: Array<ItemType> = [];
  React.useEffect(() => {
    for (let i = 0; i < 3; i++) {
      const current: ItemType = {
        itemName: `Test Item ${i}`,
        itemPrice: 20 + i,
      };
      array.push(current);
    }

    //axios({
    //url: "http://localhost:3000/api/item/",
    //method: "GET",
    //headers: {
    //'Content-Type': 'application/json'
    //}
    //})
    //.then((res) => {
    //setState(res.data.data);
    //console.log(res.data.data);
    //})
    //.catch((err) => {
    //console.log(err);
    //});
    setState(array);
  }, []);

  return (
    <div className={classes.root}>
      {state.map((item, index) => {
        return <Item item={item} key={index} imageURL="" />;
      })}
    </div>
  );
}
