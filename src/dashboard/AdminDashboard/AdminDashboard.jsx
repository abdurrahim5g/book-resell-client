/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useDashboardContex from "../../hooks/useDashboardContex";
import { Box, Button, Typography } from "@mui/material";
import useAuthContex from "../../hooks/useAuthContex";
import userFlow from "../../assets/images/users.svg";

const AdminDashboard = () => {
  const { setDBTitle } = useDashboardContex();
  const { user } = useAuthContex();
  useEffect(() => setDBTitle("Dashboard"), []);

  return (
    <div className="AdminDashboard">
      <Box
        className=""
        component="div"
        sx={{
          width: "100%",
          backgroundColor: "#D7E5F3",
          px: 6,
          py: 6,
          borderRadius: 5,
        }}
      >
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <Typography
              component={"h1"}
              style={{ fontSize: 20, fontWeight: 600 }}
            >
              Welcome Back 🖐 <br />{" "}
              <Typography
                style={{
                  fontSize: 40,
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
                component={"span"}
              >
                {user.displayName}
              </Typography>
            </Typography>
            <Typography
              style={{
                color: "#1976D2",
                maxWidth: "400px",
                marginTop: 10,
                marginBottom: 16,
              }}
            >
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there is not anything.
            </Typography>

            <Button variant="contained">Get Started</Button>
          </div>
          <div className="col-span-1">
            <img src={userFlow} alt="Image" className="max-h-80 mx-auto" />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AdminDashboard;
