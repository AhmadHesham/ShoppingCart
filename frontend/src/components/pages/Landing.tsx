import React, { ReactElement } from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import Item, { ItemType } from "../cards/Item";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        overflowY: "scroll",
      },
    },
  })
);
export default function Landing(): ReactElement | null {
  const classes = useStyles();
  const [state, setState] = React.useState(Array<ItemType>());
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const handleOpen = (val: boolean, msg: string, sev: string) => {
    console.log(val);
    setOpen(val);
    setMessage(msg);
    setSeverity(sev);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    axios({
      url: "http://localhost:3000/api/item/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setState(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      {state.map((item, index) => {
        return (
          <Item
            item={item}
            key={index}
            imageURL={`placeholder_${index + 1}`}
            handleOpen={handleOpen}
          />
        );
      })}
      <Snackbar TransitionProps={{appear: false}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity === "success" ? "success" : "error"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
