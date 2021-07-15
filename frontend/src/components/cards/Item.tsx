import { ReactElement } from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import axios from 'axios';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export interface ItemType {
  _id: string,
  name: string;
  price: number;
}

export interface ItemProps {
  imageURL: string;
  item: ItemType;
  handleOpen: (arg0: boolean, arg1: string, arg2: string) => void 
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "350px",
      minHeight: "200px",
      marginRight: "3vw",
      marginBottom: "3vw",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    typo: {
      display: 'inline-block'
    }
  })
);

export default function Item(props: ItemProps): ReactElement | null {
  const classes = useStyles();

  const handleAddToCart = () => {
    axios({
      url: 'http://localhost:3000/api/cart/addItemToCart',
      method: 'POST',
      data: {
        itemID: props.item._id
      }
    })
    .then(res => {
      console.log(res);
      props.handleOpen(true, res.data.msg, res.data.code === 200? "success" : "error");
    })
    .catch(_ => {
      props.handleOpen(true, "An Error Occured", "error");
    })
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        height="40%"
        image={`/frontend/src/images/${props.imageURL}.png`}
        alt="Product Image"
      />
      <CardContent className={classes.content}>
        <Typography 
        className={classes.typo}
        variant="body1">
          {props.item.name}
        </Typography>
        <Typography
          className={classes.typo}
          variant="body1"
        >{`Price: ${props.item.price}`}</Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
