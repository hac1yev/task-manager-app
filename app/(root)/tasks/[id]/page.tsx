import TaskInnerWrapper from "@/components/TaskInner/TaskInnerWrapper";

const TaskInner = ({ params }: ParamsType) => {
    const { id } = params;

    return (
        <TaskInnerWrapper taskId={id} />
    );
};

export default TaskInner;