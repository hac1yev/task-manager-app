"use client";

import { Box, Button, Typography } from "@mui/material";
import CustomAddUserModal from "../CustomModal/CustomAddUserModal";
import { useState } from "react";

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <Box className="flex-between" sx={{ mb: 3 }}>
      <Typography variant="h4">Team Members</Typography>
      <Button variant="contained" onClick={handleOpen}>
        + Add New User
      </Button>
      <CustomAddUserModal setOpen={setOpen} open={open} />
    </Box>
  );
};

export default AddUser;
