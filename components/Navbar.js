"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "~/store/slices/userSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.length);
  const user = useSelector((state) => state.user.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Products", href: "/products" },
    user?.role === "admin" && { label: "Admin Dashboard", href: "/admin" },
    user?.role === "rider" && { label: "Rider Dashboard", href: "/rider" },
    user
      ? { label: "Logout", onClick: handleLogout }
      : { label: "Login/Sign Up", href: "/login" },
  ].filter(Boolean);

  return (
    <>
      <AppBar position="static" className="bg-gray-900">
        <Toolbar className="flex justify-between">
          {/* Logo */}
          <Link href="/" className="no-underline text-white">
            <Typography variant="h6" className="font-bold">
              GamingStore
            </Typography>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className="no-underline text-white"
                >
                  <Button color="inherit">{item.label}</Button>
                </Link>
              ) : (
                <Button key={index} color="inherit" onClick={item.onClick}>
                  {item.label}
                </Button>
              )
            )}
            <Link href="/cart" className="no-underline text-white">
              <IconButton color="inherit">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <div className="w-64 p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                component={item.href ? Link : "button"}
                href={item.href}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem
              button
              component={Link}
              href="/cart"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
