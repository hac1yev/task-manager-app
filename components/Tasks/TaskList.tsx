"use client";

import { addUserStyle, Item } from "../MaterialSnippets/MaterialSnippets";
import { Avatar, Box, Button, Divider, FormControl, FormLabel, Modal, Stack, TextField, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { FormEvent, useCallback, useMemo, useState } from "react";
import CustomPopover from "../CustomPopovers/CustomPopover";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { taskSliceActions } from "@/store/task-slice";
import TaskHeader from "./TaskHeader";

const TaskList = ({ title, priority_level, users, subtask, created_at, _id, comments }: Partial<TaskType>) => {
  const axiosPrivate = useAxiosPrivate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [userId,setUserId] = useState("");
  const dispatch = useDispatch();
  const [subtaskValues,setSubtaskValues] = useState<SubTaskType>({
    title: "",
    date: new Date().toISOString().slice(0,10),
    tag: ""
  });
  const colors = useMemo(() => {
    return ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4"];
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setModalOpen(true), []);
  const handleModalClose = useCallback(() => setModalOpen(false), []);

  const handlePopoverOpen = useCallback((id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUserId(id);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setUserId("");
  }, []);

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);    

  const handleAddSubtask = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axiosPrivate.post(`/api/tasks/subtask/${_id}`, JSON.stringify(subtaskValues), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(taskSliceActions.addSubtaskToTask({ _id, subtask: { ...subtaskValues }}));
    } catch (error) {
      console.log(error);
    }
    setModalOpen(false);
  }, [_id,axiosPrivate,dispatch,subtaskValues]);

  return (
    <Item sx={{ mb: 2 }}>
      <Box className="flex-column-start">
        <TaskHeader priority_level={priority_level} id={_id} />
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "5px", px: 0.5 }}
        >
          <Box
            component={"span"}
            sx={{
              bgcolor:
                priority_level === "MEDIUM"
                  ? "#D08803"
                  : priority_level === "HIGH"
                  ? "#E7391A"
                  : "#0C9046",
              borderRadius: "50%",
              display: "block",
              height: "16px",
              width: "16px",
            }}
          ></Box>
          {title}
        </Box>
        <Typography sx={{ fontSize: "14px", px: 0.7, mt: 0.5 }}>
          {created_at?.slice(0, 10)}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1 }} />
      <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
        <Stack sx={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}>
          <Box component='span' className="flex-center" sx={{ gap: '2px' }}>
            <CommentOutlinedIcon sx={{ fontSize: '16px' }} /> {comments?.length}
          </Box>
          <Box component='span' className="flex-center" sx={{ gap: '2px' }}>
            <FormatListBulletedOutlinedIcon sx={{ fontSize: '16px' }} /> 0/{subtask?.length}
          </Box>
        </Stack>
        <Stack direction="row" className="flex-start">
          {users?.map((user, index) => (
            <Box key={user.fullName} component="span">
              <Avatar 
                sx={{ bgcolor: colors[index % users.length] }} 
                className="task-avatar"
                aria-owns={open ? 'mouse-over-popover' : undefined}
                onMouseLeave={handlePopoverClose} 
                onMouseEnter={handlePopoverOpen.bind(null, user.fullName)}
                aria-haspopup="true" 
              >
                {user.fullName.trim().includes(" ")
                  ? user.fullName
                      .split(" ")
                      .map((u) => u[0].toLocaleUpperCase())
                      .join("")
                  : user.fullName[0]}
              </Avatar>
              <CustomPopover 
                fullName={user.fullName}
                title={user.title}
                email={user.email}
                color={colors[index]}
                anchorEl={anchorEl}
                userId={userId}
                handlePopoverClose={handlePopoverClose}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ mt: 2 }}>
        {subtask?.length === 0 && <Typography sx={{ px: 1, mb: "5px" }}>No Sub-Task</Typography>}
        {subtask?.slice(-2)?.map((item) => (
          <Box key={item.title}  className="flex-column-start" sx={{ mb: 2, gap: '15px' }}>
            <Typography sx={{ color: '#2d2d2d', px: 1 }}>{item.title}</Typography>
            <Box className="flex-start" sx={{ px: 2, gap: '15px' }}>
              <Typography variant="subtitle1" >{item.date.slice(0,10)}</Typography>
              <Box sx={{ bgcolor: '#E8EFFF', color: 'primary.main', p: "3px 10px", borderRadius: '20px' }}>{item.tag}</Box>
            </Box>
          </Box>
        ))}
        <Button variant="text" sx={{ color: "#6f6f6f" }} onClick={handleModalOpen}>
          <AddOutlinedIcon sx={{ fontSize: "20px" }} />
          <Typography sx={{ fontSize: "15px" }}>ADD SUBTASK</Typography>
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="task-modal-title"
          aria-describedby="task-modal-description"
        >
          <Box sx={addUserStyle}>
            <Typography id="task-modal-title" variant="h6" component="h2">
              ADD SUB-TASK
            </Typography>
            <Box
              component="form"
              onSubmit={handleAddSubtask}
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
                <FormLabel htmlFor="title">Sub-Task Title</FormLabel>
                <TextField
                  id="title"
                  type="text"
                  name="title"
                  placeholder="title"
                  autoComplete="title"
                  value={subtaskValues.title}
                  onChange={(e) => {
                    setSubtaskValues({ ...subtaskValues, title: e.target.value });
                  }}
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControl sx={{ width: "50%" }}>
                  <FormLabel htmlFor="task_date">Sub-Task Date</FormLabel>
                  <TextField 
                    type="date" 
                    id="task_date" 
                    value={subtaskValues.date}
                    onChange={(e) => {                    
                      setSubtaskValues({ ...subtaskValues, date: e.target.value });
                    }}
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }}>
                  <FormLabel htmlFor="tag">Tag</FormLabel>
                  <TextField
                    id="tag"
                    type="text"
                    name="tag"
                    placeholder="tag"
                    autoComplete="tag"
                    value={subtaskValues.tag}
                    onChange={(e) => {
                      setSubtaskValues({ ...subtaskValues, tag: e.target.value });
                    }}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>
              </Box>
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
    </Item>
  );
};

export default TaskList;