"use client";

import { Avatar, Box, Button, FormControl, FormLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography, SelectChangeEvent } from "@mui/material";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { taskSliceActions, useTypedTaskSelector } from "@/store/task-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useTypedSelector } from "@/store/team-slice";
import { socket } from "@/socket-client";
import toast from "react-hot-toast";
import { notificationSliceActions } from "@/store/notification-slice";

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

const CustomEditTaskModal = ({ setOpen,open,id }: CustomModalType) => {
    const users = useTypedSelector((state) => state.teamReducer.users);
    const tasks = useTypedTaskSelector((state) => state.taskReducer.tasks);
    const findedTask = tasks.find((task) => task._id === id);

    const colors = useMemo(() => {
      return ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4"];
    }, []);
      
    const usersNames = users.map((user: Partial<UserType>) => {
        return {
            id: user._id,
            name: user.fullName
        }
    }) as {
        id: string;
      name: string;
    }[] || [];
    
    const [taskValues,setTaskValues] = useState<Partial<TaskSliceType>>({
        title: findedTask?.title,
        users: findedTask?.users,
        stage: findedTask?.stage,
        created_at: findedTask?.created_at && new Date(findedTask?.created_at).toISOString(),
        priority_level: findedTask?.priority_level
    });
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    
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
        await axiosPrivate.post(`/api/tasks/${id}`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        dispatch(taskSliceActions.editTask({ _id: id, ...data }));
        toast.success('Task updated!');

        
        const notificationResponse = await axiosPrivate.post('/api/notification', JSON.stringify({
          type: 'editTask',
          message: `Task with ID ${id} has been updated.`,
          taskId: id, 
          visibility: 'public'
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const notification = notificationResponse.data.notification;
        delete notification.__v;
        
        socket.emit("editTask", notification);

        setOpen(false);
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
              onChange={(e) =>
                setTaskValues((prev) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                })
              }
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
                  if (selected.includes(user.id)) {
                    arr.push(user.name);
                  }
                });

                return arr.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Select User</em>
              </MenuItem>
              {usersNames.map((user, index) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Avatar
                    sx={{
                      width: "35px",
                      height: "35px",
                      fontSize: "15px",
                      bgcolor: colors[index % usersNames.length],
                    }}
                  >
                    {user.name.trim().includes(" ")
                      ? user.name
                          .split(" ")
                          .map((u) => u[0].toLocaleUpperCase())
                          .join("")
                      : user.name[0]}
                  </Avatar>
                  <Typography>{user.name}</Typography>
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
                      stage: e.target.value,
                    };
                  });
                }}
                input={<OutlinedInput />}
              >
                {["TODO", "IN PROGRESS", "COMPLETED"].map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    sx={{
                      display: "flex",
                      gap: "5px",
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
                value={taskValues.created_at?.slice(0,10)}
                onChange={(e) => {
                  const currentDate = new Date().toISOString().slice(10);
                  
                  setTaskValues((prev) => {
                    return {
                      ...prev,
                      created_at: `${e.target.value}${currentDate}`,
                    };
                  }); 
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
                    priority_level: e.target.value,
                  };
                });
              }}
              input={<OutlinedInput />}
            >
              {["HIGH", "MEDIUM", "LOW"].map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  sx={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
            <Button
              type="button"
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
  );
};

export default memo(CustomEditTaskModal);