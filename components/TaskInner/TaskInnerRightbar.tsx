"use client";

import { Box, Button, Typography } from "@mui/material";
import { Search, StyledInputBase } from "../MaterialSnippets/MaterialSnippets";
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useRef, useState } from "react";
import TaskComments from "./TaskComments";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { taskDetailSliceActions, useTypedTaskDetailSelector } from "@/store/taskDetail-slice";
import { useDispatch } from "react-redux";
import { socket } from "@/socket-client";

const TaskInnerRightbar = ({ taskId, userNames }: TaskDetailType) => {
    const [commentText,setCommentText] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading,setIsLoading] = useState(false);
    const [deformedCommentText,setDeformedCommentText] = useState("");
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userInfo: Partial<UserInfo> = typeof window !== "undefined" && localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo") || "{}") 
        : "";            

    const handleAddComment = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let myStr;
            if(deformedCommentText.includes('@') && commentText.includes(deformedCommentText.split("*").join(" "))) {
                const arr = deformedCommentText.split(" ");
                const newArr = arr.map((str) => {
                    if(str.includes('@')) {
                        const newString = str.split("*").join(" ");
                        return `<span style="color: blue">${newString}</span>`
                    }
                    return str;
                });
                
                myStr = commentText.replace(deformedCommentText.split("*").join(" "), newArr.join(" "));                          
            }else{
                myStr = commentText;
            }

            const data = {
                userId: userInfo.userId,
                fullName: userInfo.fullName,
                description: `<div>${myStr}</div>`,
                adding_at: new Date(),
                avatar: userInfo.avatar
            };            

            const response = await axiosPrivate.post(`/api/tasks/${taskId}/comments`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const userIds = userNames.map((user) => user.id).filter((id) => id !== userInfo.userId);
            
            const notificationResponse = await axiosPrivate.post('/api/notification', JSON.stringify({
                userId: [...userIds],
                type: 'addComment',
                message: `<div>New comment on your task <a style="color: #1851df" href="/tasks/${taskId}">(ID: ${taskId})</a>.</div>`,
                visibility: 'private'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const notification = notificationResponse.data.notification;
            delete notification.__v;
            
            socket.emit("addComment", { notification, userIds });
            
            dispatch(taskDetailSliceActions.addComment(response.data.addedComment));
            setCommentText("");
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    };    

    return (
        <Box>
            <Typography variant="h6">COMMENTS: {taskData.comments.length}</Typography>
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
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                        inputProps={{ ref: inputRef }}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"              
                        sx={{ mr: '5px', height: "100%", borderRadius: '50%', minWidth: '40px' }}
                    >
                        <SendIcon sx={{ color: 'primary.main' }} />
                    </Button>
                </Search>
            </Box> 
            <TaskComments id={taskId} taskData={taskData} inputRef={inputRef} setCommentText={setCommentText} setDeformedCommentText={setDeformedCommentText} />
        </Box>   
    );
};

export default TaskInnerRightbar;