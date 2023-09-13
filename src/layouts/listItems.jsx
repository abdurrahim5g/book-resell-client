// import { Dashboard, Schema, GroupAdd, Group } from "@mui/icons-material";
import LinkItem from "../components/LinkItem/LinkItem";

const dashboardLink = (
  <LinkItem to="/dashboard/" text="Dashlboard" icon="Dashboard" />
);

const adminLink = (
  <>
    {dashboardLink}
    <LinkItem to="sellers" text="Sellers" icon="GroupAdd" />
    <LinkItem to="buyers" text="Buyers" icon="Group" />
    <LinkItem to="catagory" text="Catagory" icon="Schema" />
  </>
);

const sellerLink = (
  <>
    {dashboardLink}
    <LinkItem
      to="products"
      text="Products"
      icon="ProductionQuantityLimitsTwoTone"
    />
  </>
);

const buyerLink = (
  <>
    {dashboardLink}
    <LinkItem to="orders" text="Orders" icon="ViewList" />
  </>
);

export { adminLink, sellerLink, buyerLink };
