import { model, models, Schema } from "mongoose";

const SettingsSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    notification: {
        type: Object,
        default: {
            assignTask: true,
            addComment: true,
            subTask: true,
            likeComment: true,
            modifyTask: true,
            addTimeline: true,
            addUser: true,
        }
    }
});

export const Settings = models.Notification || model("Notification", SettingsSchema); 