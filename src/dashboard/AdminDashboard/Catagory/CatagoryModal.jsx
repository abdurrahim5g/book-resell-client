/* eslint-disable react/prop-types */
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CatagoryModal = ({ open, handleOpen, handleAddCatagory }) => {
  // ReactHookForm
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="catagory-modal" style={{ marginTop: "20px" }}>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        onClose={handleOpen}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Add Catagory
            </Typography>

            <div className=" mt-8">
              <form
                className="grid gap-6"
                onSubmit={handleSubmit(handleAddCatagory)}
                encType="multipart/form-data"
              >
                <TextField
                  {...register("name", { required: "Title is require" })}
                  label="Name"
                  id="outlined-size-small"
                  defaultValue=""
                  size="medium"
                  style={{ width: "100%" }}
                  error={errors?.name ? true : false}
                />

                <TextField
                  multiline
                  label="Description"
                  {...register("description", {
                    required: "Description is require",
                  })}
                  minRows={3}
                  error={errors?.description ? true : false}
                />

                <TextField
                  {...register("icon", {
                    required: "icon is require",
                  })}
                  type="file"
                  error={errors?.icon ? true : false}
                  id="icon"
                />

                <Button variant="contained" size="large" type="submit">
                  Add Catagory
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CatagoryModal;
