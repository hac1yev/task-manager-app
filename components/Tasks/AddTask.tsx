"use client";

import { Box, Button, Typography } from "@mui/material";
import CustomAddTaskModal from "../CustomModal/CustomAddTaskModal";
import { memo, useCallback, useState } from "react";

const AddTask = () => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = useCallback(() => setOpen(true), []);  

  return (
    <Box className="flex-between" sx={{ mb: 3 }}>
      <Typography variant="h4">Tasks</Typography>
      <Button variant="contained" onClick={handleModalOpen}>
        + Add Task
      </Button>
      <CustomAddTaskModal setOpen={setOpen} open={open} />
    </Box>
  );
};

export default memo(AddTask);