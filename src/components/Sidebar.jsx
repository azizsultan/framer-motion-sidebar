import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

//import { SidebarMenu } from "./SidebarMenu.jsx";
import SidebarMenu2 from "./SidebarMenu2.jsx";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />
      }
    ]
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />
  }
];
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: { width: 0, padding: 0, opacity: 0, transition: { duration: 0.2 } },
    show: {
      width: "160px",
      padding: "5px 15px",
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const linkTextAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "40px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 12
          }
        }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && (
            <motion.h1
              variants={linkTextAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="logo"
            >
              Main Menu
            </motion.h1>
          )}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="search">
          <div className="search_icon">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                variants={inputAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                type="text"
                placeholder="Search..."
              />
            )}
          </AnimatePresence>
        </div>
        <section className="routes">
          {routes.map(route => {
            if (route.subRoutes) {
              return (
                <SidebarMenu2
                  linkTextAnimation={linkTextAnimation}
                  route={route}
                  isOpen={isOpen}
                  key={route.name}
                  setIsOpen={setIsOpen}
                />
                // <SidebarMenu
                //   route={route}
                //   isOpen={isOpen}
                //   linkTextAnimation={linkTextAnimation}
                //   key={route.name}
                //   setIsOpen={setIsOpen}
                // />
              );
            }
            return (
              <NavLink
                activeClassName="active"
                to={route.path}
                key={route.name}
                className="link"
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={linkTextAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
