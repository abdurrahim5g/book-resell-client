/* eslint-disable react/prop-types */
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Icon from "@mui/icons-material";

const LinkItem = ({ to, text, icon }) => {
  const LinkIcon = Icon[icon] || Icon["GradingTwoTone"];

  return (
    <NavLink to={to}>
      <ListItemButton>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </NavLink>
  );
};

export default LinkItem;
