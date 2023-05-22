import React from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Calendar from "./Calendar";
import Modal from "./Modal";
import ModalLayout from "./ModalLayout";
import Button from "../Atoms/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useGlobalContext } from "../Context";
import { motion } from "framer-motion";

const Layout = () => {
  const { openModal } = useGlobalContext();
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative bg-white transition-all">
      <Modal />
      <ModalLayout />
      <Menu />
      <Calendar />
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="fixed bottom-16 right-16"
      >
        <Button
          className=" shadow-gray-900 rounded-full text-slate-100 text-4xl p-2 shadow-2xl bg-blue-600 "
          icon={<AiOutlinePlus />}
          onclick={openModal}
        />
      </motion.div>
    </div>
  );
};

export default Layout;
