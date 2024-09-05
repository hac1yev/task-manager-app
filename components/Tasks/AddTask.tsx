"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { teamSliceAction } from "@/store/team-slice";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import theme from "../theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddTask = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      _id: uniqid(),
      fullName: formData.get("fullName"),
      title: formData.get("title"),
      email: formData.get("email"),
      password: `${formData.get("role")}1234`,
      role: formData.get("role"),
      status: "Active",
      created_at: new Date().toISOString(),
    };

    try {
      await axiosPrivate.post("/api/team", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(teamSliceAction.addUser(data));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box className="flex-between" sx={{ mb: 3 }}>
      <Typography variant="h4">Tasks</Typography>
      <Button variant="contained" onClick={handleOpen}>
        + Add Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="task-modal-title"
        aria-describedby="task-modal-description"
      >
        <Box sx={addUserStyle}>
          <Typography id="task-modal-title" variant="h6" component="h2">
            ADD TASK
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
              <FormLabel htmlFor="title">Task Title</FormLabel>
              <TextField
                id="title"
                type="text"
                name="title"
                placeholder="Task Title"
                autoComplete="title"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "title" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="users">Assign Task To</FormLabel>
              <Select
                id="users"
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FormControl sx={{ width: "50%" }}>
                <FormLabel htmlFor="stage">Task Stage</FormLabel>
                <Select
                  id="stage"
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <FormLabel htmlFor="task_date">Task Date</FormLabel>
                <TextField type="date" id="task_date" />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="priority_level">Priority Level</FormLabel>
              <Select
                id="priority_level"
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
              <Button
                type="submit"
                size="large"
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" size="large" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddTask;
