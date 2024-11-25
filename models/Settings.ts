import { model, models, Schema } from "mongoose";
import { User } from "./User";

const SettingsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        unique: true,
        required: true
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

export const Settings = models.Settings || model("Settings", SettingsSchema); 