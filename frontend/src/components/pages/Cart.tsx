import React, { ReactElement } from "react";
import { Theme, makeStyles, createStyles, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Item, { ItemType, RenderType } from "../cards/Item";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "70%",
      height: "70%",
      border: "1px solid rgba(105,105,105,0.75)",
      borderRadius: 30,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      height: "95%",
      width: "100%",
      alignItems: "center",
      overflowY: "scroll",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    itemContainer: {
      width: "70%",
      height: "90%",
      marginLeft: "1vw",
      overflowY: "scroll",
      alignItems: 'center',
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    info: {
      width: "25%",
      height: "90%",
      marginLeft: "1vw",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    title: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
    },
    floatRight: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      marginTop: "1vw",
    },
  })
);

export default function Cart(): ReactElement | null {
  const classes = useStyles();
  const [items, setItems] = React.useState(Array<ItemType>());
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [sum, setSum] = React.useState(0);
  const [coupon, setCoupon] = React.useState("");
  const [divider, setDivider] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    setOpen(false);
  };

  const handleOpen = (val: boolean, msg: string, sev: string) => {
    setOpen(val);
    setMessage(msg);
    setSeverity(sev);
  };

  const handleClick = (itemID: string) => {
    axios({
      url: "http://localhost:3000/api/cart/removeItemFromCart",
      method: "POST",
      data: {
        itemID,
      },
    })
      .then((res) => {
        handleOpen(true, res.data.msg, "success");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let value = event.target.value;
    setCoupon(value);
  };

  const handleApplyCoupon = () => {
    axios({
      url: "http://localhost:3000/api/coupon/check",
      method: "POST",
      data: {
        code: coupon,
      },
    })
      .then((res) => {
        if (res.data.data) {
          handleOpen(true, "Coupon Applied", "success");
          if (res.data.data.flatValue) {
            setSum(sum - res.data.data.value);
          } else {
            setSum(Number((sum - (sum * res.data.data.value) / 100).toFixed()));
          }
        } else {
          handleOpen(true, "Wrong Coupon Code", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRedeemCoupon = () => {
    axios({
      url: "http://localhost:3000/api/coupon/redeem",
      method: "GET",
    })
      .then((res) => {
        handleOpen(true, `Your Code: ${res.data.data._id}`, "success");
      })
      .catch((err) => {
        handleOpen(true, "An Error Occured", "error");
      });
  };

  // const handleResize = () => {
  //   if (window.innerWidth <= 602) {
  //     console.log('boi');
  //     setDivider(true);
  //   }
  // };

  React.useEffect(() => {
    // window.addEventListener("resize", handleResize);
    const loadItems = async () => {
      await axios({
        url: "http://localhost:3000/api/cart/",
        method: "GET",
      })
        .then((res) => {
          setItems(res.data.data);
          setLoading(false);
          let sum = 0;
          res.data.data.forEach((item: ItemType) => {
            sum += item.price;
          });
          setSum(sum);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadItems();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4">Cart</Typography>
      <div className={classes.container}>
        <div className={classes.itemContainer}>
          {loading ? (
            <CircularProgress />
          ) : (
            items.map((item, index) => {
              return (
                <Item
                  type={RenderType.CART}
                  handleClick={handleClick}
                  item={item}
                />
              );
            })
          )}
        </div>
        <div className={classes.info}>
          <Typography
            style={{ display: "inline-block", marginBottom: "3vw" }}
            variant="h4"
          >
            Total
          </Typography>
          <div className={classes.title}>
            <Typography variant="h5">Coupon: </Typography>
          </div>
          <div className={classes.floatRight}>
            <TextField
              placeholder="Enter Your Coupon"
              variant="outlined"
              onChange={handleChange}
            ></TextField>
          </div>
          <div className={classes.floatRight}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleApplyCoupon}
            >
              Apply
            </Button>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRedeemCoupon}
            style={{ width: "100%", marginTop: "1vw" }}
          >
            Redeem
          </Button>
          <Divider style={{ width: "95%", marginTop: "1vw" }} />
          <div style={{ marginTop: "1vw", display: "flex", width: "100%" }}>
            <div className={classes.title}>
              <Typography>Amount To Pay: </Typography>
            </div>
            <div className={classes.floatRight}>
              <Typography variant="h4">{sum}</Typography>
            </div>
          </div>
        </div>
        <Snackbar
          TransitionProps={{ appear: false }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity === "success" ? "success" : "error"}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
