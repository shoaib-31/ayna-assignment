"use client";
import Image from "next/image";
import React, { useState } from "react";
import aynaLogo from "@/assets/ayna.svg";
import { tabs, TabType } from "@/constants/tabs";
import TabComponent from "@/components/TabComponent";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const direction = activeTab === tabs[0] ? -1 : 1;

  const animationVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[100dvh] p-4 sm:p-8 rounded-lg shadow-md">
      <Image
        width={50}
        height={100}
        src={aynaLogo}
        className="h-16 w-auto sm:h-20 mb-10"
        alt="ayna logo"
      />
      <TabComponent activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className="min-h-[450px] w-full flex justify-center h-fit relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {activeTab === "Login" ? (
            <motion.div
              key="login"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              className="w-full flex justify-center"
            >
              <Login />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              className="w-full flex justify-center"
            >
              <Signup />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
