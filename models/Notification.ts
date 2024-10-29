import { model, models, Schema } from "mongoose";
import { User } from "./User";

const NotificationSchema = new Schema({
    fullName: {
        type: String,
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
    isReadUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
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

export const Notification = models.Notification || model('Notification', NotificationSchema);