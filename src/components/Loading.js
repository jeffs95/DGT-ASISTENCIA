import React from "react";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      style={styles.overlay}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <BounceLoader color="#17c3a2" size={60} speedMultiplier={2} />
    </motion.div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default Loading;
