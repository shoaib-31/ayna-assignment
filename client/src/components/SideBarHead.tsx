"use client";
import React from "react";
import aynaLogo from "@/assets/ayna.svg";
import aynaLogoSmall from "@/assets/ayna-logo.svg";
import { useSidebar } from "./ui/sidebar";
import Image from "next/image";
import { motion } from "framer-motion";

const SideBarHead = () => {
  const { state } = useSidebar();

  const animationVariants = {
    collapsed: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="my-4 w-full flex items-center justify-center"
      variants={animationVariants}
      animate={state === "collapsed" ? "collapsed" : "expanded"}
    >
      <Image
        width={state === "collapsed" ? 30 : 150}
        height={50}
        src={state === "collapsed" ? aynaLogoSmall : aynaLogo}
        alt="ayna logo"
      />
    </motion.div>
  );
};

export default SideBarHead;
