"use client";

import { Box, Button, Typography } from "@mui/material";
import { Search, StyledInputBase } from "../MaterialSnippets/MaterialSnippets";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

const TaskInnerRightbar = ({ comments }: { comments: { user: string; description: string; adding_at:string; }[] }) => {
    const [commentText,setCommentText] = useState("");

    const handleAddComment = async (e) => {
        
    };

    return (
        <Box>
            <Typography variant="h6">COMMENTS: 45</Typography>
            <Box className="comment-box" sx={{ my: 2 }}>
                <Search sx={{ height: "100%", display: 'flex', alignItems: 'center', mx: 0, marginLeft: '0px' }} onSubmit={handleAddComment}>
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
                        sx={{ mr: 1, height: "100%", borderRadius: '50%', minWidth: '40px' }}
                    >
                    
                        <SendIcon sx={{ color: 'primary.main' }} />
                    </Button>
                </Search>
            </Box> 
        </Box>   
    );
};

export default TaskInnerRightbar;