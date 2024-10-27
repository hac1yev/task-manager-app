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
        _id?: string;
    }[];
    comments: {
        _id?: string;
        fullName: string;
        description: string;
        adding_at:string;
        likes: string[];
    }[];
    activities: {
        _id?: string;
        name: string;
        description: string;
        created_at: string;
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
        _id?: string;
    }[];
    comments: {
        _id?: string;
        fullName: string;
        description: string;
        adding_at:string;
        likes: string[];
    }[];
    activities: {
        _id?: string;
        name: string;
        description: string;
        created_at: string;
    }[];
};

declare type CustomPopoverType = {
    color: string;
    userId: string;
    anchorEl: HTMLElement | null;
    handlePopoverClose: () => void;
    id?: string;
};

declare type SubTaskType = {
    title: string;
    date: string;
    tag: string;
};

declare type CustomModalType = {
    setOpen: (value: boolean) => void;
    open: boolean;
    id?: string;
};

declare type DialogModalType = {
    setOpenDialog: (value: boolean) => void;
    openDialog: boolean;
    id?: string;
};

declare interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
};

declare type ParamsType = {
    params: {
        id: string;
    };
};

declare type TaskDetailType = {
    userNames: { fullName: string; title: string }[];
    taskId: string;
}; 

declare type UserInfo = {
    userId: string;
    fullName: string;
    email: string;
    role: string;
    accessToken: string;
    title: string;
};

declare type NotificationType = {
    _id: string;
    taskId: string;
    commentId: string;
    isRead: boolean;
    message: string;
    createdAt: string;
    visibility: string;
    type: string;
    fullName: string;
};

declare type NotificationPopoverType = {
    lengthOfNotification: number;
    notifications: Partial<NotificationType>[];
    userInfo: Partial<UserInfo> | null;
}; 