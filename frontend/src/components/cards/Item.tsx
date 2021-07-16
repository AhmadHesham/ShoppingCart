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
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

export interface ItemType {
  _id: string;
  name: string;
  price: number;
}

export enum RenderType {
  LANDING,
  CART,
}

export interface ItemProps {
  type: RenderType;
  item: ItemType;
  handleClick: (arg0: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "30%",
      minHeight: "200px",
      maxWidth: "70%",
      marginRight: "3vw",
      marginBottom: "3vw",
      [theme.breakpoints.down("sm")]: {
        minWidth: "100%",
      },
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    typo: {
      display: "inline-block",
    },
    image: {
      backgroundImage:
        "url(https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png?format=webp&v=1530129132)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        minHeight: "150px",
      },
    },
  })
);

export default function Item(props: ItemProps): ReactElement | null {
  const classes = useStyles();

  const handleAddToCart = () => {};

  const handleClick = () => {
    props.handleClick(props.item._id);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.image} />
      <CardContent className={classes.content}>
        <Typography className={classes.typo} variant="h5">
          {props.item.name}
        </Typography>
        <Typography
          className={classes.typo}
          variant="body1"
        >{`Price: ${props.item.price}`}</Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        {props.type === RenderType.LANDING ? (
          <Button onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </Button>
        ) : (
          <Button onClick={handleClick}>
            <RemoveShoppingCartIcon color="error" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
