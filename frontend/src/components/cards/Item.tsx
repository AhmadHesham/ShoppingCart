import { ReactElement } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export interface ItemType {
  itemName: string;
  itemPrice: number;
}

export interface ItemProps {
  imageURL?: string;
  item: ItemType;
}

export default function Item(props: ItemProps): ReactElement | null {
  return (
    <Card style={{ width: "15vw", height: "15vw", marginRight: "3vw" }}>
      <CardContent style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">{props.item.itemName}</Typography>
      </CardContent>
      <CardMedia image={props.imageURL!} />
      <CardActions>
        <Button>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
