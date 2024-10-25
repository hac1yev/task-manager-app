import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    type: { 
        type: String, 
        enum: ['deleteTask', 'editTask', 'duplicateTask', 'likeComment', 'replyComment'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    taskId: { 
        type: String,  
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    visibility: { 
        type: String, 
        enum: ['public', 'private'], 
        default: 'private' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);