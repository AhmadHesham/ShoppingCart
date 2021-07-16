import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "4vw",
    },
    menuButton: {
      width: "5%",
    },
    title: {
      width: "95%",
      display: "flex",
      justifyContent: "flex-start",
    },
    redirect: {
      cursor: 'pointer'
    }
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const handleCart = () => {
    history.push("/cart");
  };

  const handleHome = () => {
    history.push("/");
  }

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <div className={classes.title}>
          <Typography onClick={handleHome} className={classes.redirect} variant="h6">Market</Typography>
        </div>
        <div>
          <Button
            color="inherit"
            className={classes.menuButton}
            onClick={handleCart}
          >
            <ShoppingCartIcon />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
