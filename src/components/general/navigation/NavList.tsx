// import { NavLink } from "react-router-dom";

import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from "../../common";
import { CategoryIcon, DashboardIcon, ExpenseIcon, PortfolioIcon } from "../../icons";

const NavList = ({ clickCallback = () => {} }) => {
  return (
    <>
      <List>
        <ListItemButton
          // component={NavLink}
          onClick={clickCallback}
          sx={{ pl: 2.5 }}
          // to="/dashboard"
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          // component={NavLink}
          onClick={clickCallback}
          sx={{ pl: 2.5 }}
          // to="/categories"
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton
          // component={NavLink}
          onClick={clickCallback}
          sx={{ pl: 2.5 }}
          // to="/expenses"
        >
          <ListItemIcon>
            <ExpenseIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          //component={NavLink}
          onClick={clickCallback}
          sx={{ pl: 2.5 }}
          // to="/"
        >
          <ListItemIcon>
            <PortfolioIcon />
          </ListItemIcon>
          <ListItemText primary="Portfolio Tool" />
        </ListItemButton>
      </List>
    </>
  );
};

export default NavList;
