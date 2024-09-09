"use client";

import TasksApiCall from "../HOC/TasksApiCall";
import Tasks from "./Tasks";

const HOCTasksComponent = TasksApiCall(Tasks);


const FilteredTasks = ({ stage }: { stage: string }) => {
    
    return (
        <HOCTasksComponent stage={stage} />
    )
}

export default FilteredTasks