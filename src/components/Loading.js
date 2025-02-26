import React, { useState } from "react";
import { BounceLoader } from "react-spinners";
import { Fade } from "react-bootstrap";

const Loading = () => {
  const [show, setShow] = useState(true);

  return (
    <Fade in={show}>
      <div style={styles.overlay}>
        <BounceLoader color="#17c3a2" size={60} speedMultiplier={2} />
      </div>
    </Fade>
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