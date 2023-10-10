import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

export const SidebarMenu = ({
  route,
  linkTextAnimation,
  isOpen,
  setIsOpen
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };
  const menuAnimation = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, when: "afterChildren" }
    },
    show: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren" }
    }
  };

  const menuItemAnimation = {
    hidden: i => ({ padding: 0, x: "-100%", transition: (i + 1) * 0.5 }),
    show: i => ({ x: "0", transition: (i + 1) * 0.5 })
  };
  useEffect(() => {
    if (isOpen === false) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <div className="menu" onClick={toggleMenu}>
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
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  custom={i}
                  key={i}
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
                          initial="hidden"
                          animate="show"
                          exit="hidden"
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
