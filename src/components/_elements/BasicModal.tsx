import { Modal, Paper } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 320, sm: 380 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function BasicModal({ open, setOpen, children }: any) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>{children}</Paper>
      </Modal>
    </div>
  );
}
