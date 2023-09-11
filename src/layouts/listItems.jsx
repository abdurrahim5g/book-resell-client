import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import SchemaIcon from "@mui/icons-material/Schema";

const dashboardLink = (
  <NavLink to="/dashboard/">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </NavLink>
);

const adminListItem = (
  <>
    {dashboardLink}
    <NavLink to="sellers">
      <ListItemButton>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Sellers" />
      </ListItemButton>
    </NavLink>
    <NavLink to="buyers">
      <ListItemButton>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Buyers" />
      </ListItemButton>
    </NavLink>
    <NavLink to="catagory">
      <ListItemButton>
        <ListItemIcon>
          <SchemaIcon />
        </ListItemIcon>
        <ListItemText primary="Catagory" />
      </ListItemButton>
    </NavLink>
  </>
);

const sellerListItem = (
  <>
    {dashboardLink}
    <NavLink to="#">
      <ListItemButton>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </NavLink>
    <NavLink to="#">
      <ListItemButton>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </NavLink>
    <NavLink to="#">
      <ListItemButton>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </NavLink>
  </>
);

export { adminListItem, sellerListItem };
