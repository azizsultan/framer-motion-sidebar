import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

const SidebarMenu2 = ({ linkTextAnimation, route, isOpen, setIsOpen }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const toggelMenu = () => {
    setisMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setisMenuOpen(false);
    }
  }, [isOpen]);

  const menuAnimation = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.1, when: "afterChildren" }
    },
    show: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.2, when: "beforeChildren" }
    }
  };
  const menuItemAnimation = {
    hidden: i => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1
      }
    }),
    show: i => ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1
      }
    })
  };
  return (
    <>
      <div className="menu" onClick={toggelMenu}>
        <div className="menu_item">
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
        </div>
        {isOpen && (
          <motion.div animate={isMenuOpen ? { rotate: -180 } : { rotate: 0 }}>
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => {
              return (
                <motion.div
                  variants={menuItemAnimation}
                  custom={i}
                  key={subRoute.name}
                >
                  <NavLink
                    activeClassName="active"
                    to={subRoute.path}
                    className="link"
                  >
                    <div className="icon">{subRoute.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={linkTextAnimation}
                          className="link_text"
                        >
                          {subRoute.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu2;
