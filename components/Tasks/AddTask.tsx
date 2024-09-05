"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useTypedSelector } from "@/store/team-slice";
import { Avatar, Box, Button, FormControl, FormLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import { taskSliceActions } from "@/store/task-slice";

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

const AddTask = () => {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const usersNames = users.map((user: Partial<UserType>) => {
    return {
      id: user._id,
      name: user.fullName
    }
  }) as {
    id: string;
    name: string;
  }[] || [];
  const [taskValues,setTaskValues] = useState<Partial<TaskType>>({
    title: "",
    users: [],
    stage: "",
    created_at: new Date().toISOString().slice(0,10),
    priority_level: ""
  });
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: taskValues.title,
      users: taskValues.users,
      stage: taskValues.stage,
      created_at: taskValues.created_at,
      priority_level: taskValues.priority_level 
    };

    try {
      await axiosPrivate.post("/api/tasks", JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dispatch(taskSliceActions.addTask({
        _id: uniqid(),
        ...data,
        subtask: []
      }));

      setOpen(false);
      setTaskValues({ title: "", users: [], stage: "", created_at: new Date().toISOString().slice(0,10), priority_level: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    
    setTaskValues((prev) => ({
      ...prev,
      users: typeof value === 'string' ? value.split(',') : value
    }));
  };

  return (
    <Box className="flex-between" sx={{ mb: 3 }}>
      <Typography variant="h4">Tasks</Typography>
      <Button variant="contained" onClick={handleModalOpen}>
        + Add Task
      </Button>
      <Modal
        open={open}
        onClose={handleModalClose}
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
                value={taskValues.title}
                onChange={(e) => setTaskValues((prev) => {
                  return {
                    ...prev,
                    title: e.target.value
                  }
                })}
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="users">Assign Task To</FormLabel>
              <Select
                multiple
                displayEmpty
                value={taskValues.users}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Select User</em>;
                  }
                  const arr: string[] = [];
                  usersNames.forEach((user) => {
                    if(selected.includes(user.id)) {
                      arr.push(user.name)
                    }
                  });
                                
                  return arr.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em>Select User</em>
                </MenuItem>
                {usersNames.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
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
                  value={taskValues.stage}
                  onChange={(e) => {
                    setTaskValues((prev) => {
                      return {
                        ...prev,
                        stage: e.target.value
                      }
                    })
                  }}
                  input={<OutlinedInput />}
                >
                  {['TODO','IN PROGRESS','COMPLETED'].map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{
                        display: 'flex',
                        gap: '5px'
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <FormLabel htmlFor="task_date">Task Date</FormLabel>
                <TextField 
                  type="date" 
                  id="task_date" 
                  value={taskValues.created_at}
                  onChange={(e) => {                    
                    setTaskValues((prev) => {
                      return {
                        ...prev,
                        created_at: e.target.value
                      }
                    })
                  }}
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="priority_level">Priority Level</FormLabel>
              <Select
                id="priority_level"
                displayEmpty
                value={taskValues.priority_level}
                onChange={(e) => {
                  setTaskValues((prev) => {
                    return {
                      ...prev,
                      priority_level: e.target.value
                    }
                  })
                }}
                input={<OutlinedInput />}
              >
                {['HIGH','MEDIUM','NORMAL'].map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    sx={{
                      display: 'flex',
                      gap: '5px'
                    }}
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
                onClick={handleModalClose}
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