"use client";

import { Box, Button, FormControl, FormLabel, Modal, TextField, Typography } from "@mui/material";
import { FormEvent, memo, useCallback } from "react";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const ChangePasswordModal = ({ openChangePasswordModal, handleCloseChangePasswordModal, setOpenChangePasswordModal }: 
{ 
    handleCloseChangePasswordModal: () => void; 
    openChangePasswordModal: string;
    setOpenChangePasswordModal: (value: string) => void;
}) => {

  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      await axiosPrivate.post("/api/change-password", JSON.stringify({
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      }), {
        headers: {
            'Content-Type': 'application/json'
        }
      });

      setOpenChangePasswordModal("");

      toast.success('Password changed successfully!');
    } catch (error) {
      console.log(error);
    }
  }, [axiosPrivate]);

  return (
    <Modal
      open={openChangePasswordModal ? true : false}
      onClose={handleCloseChangePasswordModal}
      aria-labelledby="edit-modal"
      aria-describedby="edit-modal-description"
    >
      <Box sx={addUserStyle}>
        <Typography id="edit-modal" variant="h6" component="h2">
          CHANGE PASSWORD
        </Typography>
        <Box
          component="form"
          onSubmit={handleConfirm}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <TextField
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="New Password"
              autoComplete="newPassword"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "newPassword" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <TextField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="confirmPassword"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "confirmPassword" }}
            />
          </FormControl>
          <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
            <Button
              type="button"
              size="large"
              variant="outlined"
              onClick={handleCloseChangePasswordModal}
            >
              Cancel
            </Button>
            <Button type="submit" size="large" variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ChangePasswordModal);