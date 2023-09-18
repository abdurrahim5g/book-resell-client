/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import * as Icon from "react-icons/fa";

const SocialIcon = ({ to, icon }) => {
  const SIcon = Icon[icon] || Icon["FaAccusoft"];

  return (
    <Link to={to}>
      <SIcon />
    </Link>
  );
};

export default SocialIcon;
