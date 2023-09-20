/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({
  deleteCatagory,
  handleDeleteDialog,
  handleCatagoryDelete,
}) => {
  return (
    <div>
      <Dialog
        open={deleteCatagory && true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleDeleteDialog()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Are you sure you want to delete this catagory?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography component={"strong"} style={{ fontWeight: 600 }}>
              Note:
            </Typography>{" "}
            We are not backup the catagory data. So, Please make sure you
            don&apos;t need this data anynore!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button
            onClick={() => handleCatagoryDelete(deleteCatagory)}
            color="error"
          >
            Delete
          </Button>
          <Button onClick={() => handleDeleteDialog(null)} variant="contained">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
