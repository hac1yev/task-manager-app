declare type DashboardProps = {
    children: React.ReactNode;
};

declare type StatCardProps = {
    id: string;
    title: string;
    count: number;
    logo_img: React.ReactNode;
    palette: string;
};

declare type UserType = {
    created_at: string; 
    _id: string; 
    fullName: string; 
    email: string; 
    role: string; 
    title: string; 
    status: string; 
};

declare type TaskType = {
    _id: string;
    title: string;
    users: {
        fullName: string;
        title: string;
        email: string;
    }[];
    stage: string;
    priority_level: string;
    created_at: string;
    subtask: {
        title: string;
        date: string;
        tag: string;
    }[];
};

declare type TaskSliceType = {
    _id: string;
    title: string;
    users: string[];
    stage: string;
    priority_level: string;
    created_at: string;
    subtask: {
        title: string;
        date: string;
        tag: string;
    }[];
};

declare type CustomPopoverType = {
    color: string;
    userId: string;
    anchorEl: HTMLElement | null;
    handlePopoverClose: () => void
};

declare type SubTaskType = {
    title: string;
    date: string;
    tag: string;
};