"use client";

import { Box, Button, Typography } from "@mui/material";
import { Search, StyledInputBase } from "../MaterialSnippets/MaterialSnippets";
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useState } from "react";
import TaskComments from "./TaskComments";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { taskDetailSliceActions, useTypedTaskDetailSelector } from "@/store/taskDetail-slice";
import { useDispatch } from "react-redux";

const TaskInnerRightbar = () => {
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);
    const [commentText,setCommentText] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userInfo: Partial<UserInfo> = typeof window !== "undefined" && localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo") || "{}") 
        : "";            

    const handleAddComment = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const data = {
                taskId: taskData._id,
                fullName: userInfo.fullName,
                description: commentText,
                adding_at: new Date(),
            };            

            const response = await axiosPrivate.post("/api/tasks/comments", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            dispatch(taskDetailSliceActions.addComment(response.data.addedComment));

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Typography variant="h6">COMMENTS: 45</Typography>
            <Box className="comment-box" sx={{ my: 2 }}>
                <Search 
                    onSubmit={handleAddComment}
                    sx={{ 
                        alignItems: 'center', 
                        borderRadius: '5px', 
                        marginLeft: '0px', 
                        display: 'flex', 
                        height: "100%", 
                        mx: 0, 
                    }}
                >
                    <StyledInputBase
                        placeholder="Comment yaz..."
                        sx={{ width: "100%" }}
                        className="text-comment-input"
                        inputProps={{ "aria-label": "search" }}
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                    />
                    <Button
                        type="submit"              
                        sx={{ mr: '5px', height: "100%", borderRadius: '50%', minWidth: '40px' }}
                    >
                    
                        <SendIcon sx={{ color: 'primary.main' }} />
                    </Button>
                </Search>
            </Box> 
            <TaskComments />
        </Box>   
    );
};

export default TaskInnerRightbar;