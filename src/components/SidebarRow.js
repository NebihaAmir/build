import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { ChevronLeft, ExpandMore } from "@material-ui/icons";

const SidebarRow = ({ icon, title, path, collapse, childs }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      {collapse && (
        <>
          <li
            button
            onClick={handleClick}
            className="flex space-x-3 p-3 justify-center items-center flex-grow"
          >
            {icon}
            <ListItemText primary={title} />

            {open ? <ExpandMore /> : <ChevronLeft />}
          </li>
          <Collapse in={open} unmountOnExit>
            <List component="div" disablePadding>
              {childs.map((child) => {
                return (
                  <li key={child.name}>
                    <NavLink
                      exact
                      activeClassName="bg-color"
                      to={child.path}
                      className="hover:bg-color hover:text-white p-3 flex items-center flex-grow"
                    >
                      <ListItemText
                        className="font-thin"
                        primary={child.name}
                      />
                    </NavLink>
                  </li>
                );
              })}
            </List>
          </Collapse>
        </>
      )}
      {!collapse && (
        <>
          <li link className="flex">
            <NavLink
              activeClassName="bg-color"
              to={path}
              exact
              className=" hover:bg-color hover:text-white p-3 space-x-3 flex items-center flex-grow"
            >
              {icon}
              <ListItemText primary={title} />
            </NavLink>
          </li>
        </>
      )}
    </div>
  );
};

export default SidebarRow;
