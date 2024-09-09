import { model, models, Schema } from "mongoose";
import { Task } from "./Task";

const TrashSchema = new Schema({
    trashTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: Task
        },
    ],
});

export const Trash = models.Trash || model("Trash", TrashSchema);