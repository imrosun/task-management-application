import { formatDistanceToNow } from 'date-fns';

export interface Task {
    title: string;
    priority: string;
    description: string;
    status: string;
    deadline: string;
    email: string;
}

export interface Task_dashboard {
    _id: string;
    title: string;
    priority: string;
    description: string;
    status: string;
    deadline: string;
    user: string;
    __v: number;
    createdAt: string;
}

export interface Task_drag {
    _id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
    createdAt: string;
    status: string;
}

export interface DashboardProps {
    tasks: Task_drag[];
    openModal: (status: string) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task_drag[]>>;
}

export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return 'Unknown time';
    }
    return formatDistanceToNow(date, { addSuffix: true });
}

