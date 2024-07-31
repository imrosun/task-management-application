"use client"
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import introducing_tag from "../assets/introducing_tag.png"
import share_notes from "../assets/share_notes.png"
import access_anywhere from "../assets/access_anywhere.png"
import { useEffect, useState } from "react";
import Task_modal from "../components/Task_modal";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Task_dashboard, Task_drag, timeAgo } from "../utils/types";
import { BASE_URL } from "../services/apiEndpoints";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, logout, userFullName } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [currentStatus, setCurrentStatus] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task_dashboard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [draggedTask, setDraggedTask] = useState<Task_drag | null>(null);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, task: Task_drag) => {
        setDraggedTask(task);
        event.dataTransfer.setData("text/plain", task._id);
        const element = event.currentTarget;
        element.classList.add('dragging-during');
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        element.classList.remove('dragging-during');
    };

    const handleDrop = async (status: string) => {
        if (draggedTask) {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const updatedTasks = tasks.map(task =>
                    task._id === draggedTask._id ? { ...task, status } : task
                );
                setTasks(updatedTasks);

                const response = await fetch(`${BASE_URL}/tasks/${draggedTask._id}`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify({ status }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to update task status');
                }
                const result = await response.json();
                console.log('Task status updated successfully:', result);

            } catch (error) {
                console.error('Failed to update task status:', error);
            } finally {
                setDraggedTask(null);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const openModal = (status: string) => {
        setCurrentStatus(status);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentStatus(null);
    }

    const firstName = userFullName?.split(' ')[0] || 'User';

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('User not authenticated');
                return;
            }
            try {
                const response = await fetch(`${BASE_URL}/tasks/login/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            if (isAuthenticated) {
                setLoading(false);
                router.push('/dashboard');
            } else {
                router.push('/signin');
            }
        };
        checkAuth();
    }, [isAuthenticated, router]);

    //   if (loading) {
    //     return <p>Loading... Please Log In first</p>; 
    //   }

    const handleLogout = () => {
        logout();
        router.push('/signin');
    };

    const statusMapping: { [key: string]: string } = {
        toDo: "To do",
        inProgress: "In progress",
        underReview: "Under review",
        finished: "Finished"
      };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent' || 'urgent':
                return 'bg-[#FF6B6B]';
            case 'Medium' || 'medium':
                return 'bg-[#FFA235]';
            case 'Low' || 'low':
                return 'bg-[#0ecc5a]';
            default :
                return 'bg-[#4C38C2]'
        }
    };

    const handleTaskAdded = (task: any) => {
        console.log('Task added:', task);
    };

    return (
        <div className="bg-[#F4F4F4] flex w-fit flex-grow flex-row">
            <Sidebar openModal={openModal} onLogout={handleLogout} />
            <div className="p-4 w-[85%] flex flex-col">
                <div className="flex justify-between mb-2">
                    <h1 style={{ fontFamily: "Barlow", fontWeight: 600 }} className="text-[#080808] text-2xl ">Good morning, {firstName}!</h1>
                    <div className="inline-flex gap-2">
                        <h4 className="text-[#080808]">Help & feedback</h4>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#080808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 9.00001C9 5.49998 14.5 5.50001 14.5 9.00001C14.5 11.5 12 10.9999 12 13.9999" stroke="#080808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18.0099L12.01 17.9988" stroke="#080808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className="flex justify-between gap-2">
                    <div className="inline-flex p-3 gap-3 items-center bg-[#FFFFFF] border-[1px] border-[#F4F4F4] rounded-lg">
                        <Image src={introducing_tag} width={100} height={100} alt="introducing_tag" />
                        <div className="flex flex-col">
                            <h1 className="text-md font-semibold text-[#757575]">Introducing tags</h1>
                            <p className="text-[#868686] text-xs">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
                        </div>
                    </div>
                    <div className="inline-flex p-3 gap-3 items-center bg-[#FFFFFF] border-[1px] border-[#F4F4F4] rounded-lg">
                        <Image src={share_notes} width={120} height={120} alt="share_notes" />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold text-[#757575]">Share Notes Instantly</h1>
                            <p className="text-[#868686] text-xs">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
                        </div>
                    </div>
                    <div className="inline-flex p-3 gap-3 items-center bg-[#FFFFFF] border-[1px] border-[#F4F4F4] rounded-lg">
                        <Image src={access_anywhere} width={100} height={100} alt="access_anywhere" />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold text-[#757575]">Access Anywhere</h1>
                            <p className="text-[#868686] text-xs">Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-3">
                    <div className="flex justify-between gap-32 bg-[#FFFFFF] rounded-lg p-2 border-[1px] border-[#E9E9E9]">
                        <h3 className="text-[#797979] text-sm">Search</h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17L21 21" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="inline-flex gap-6 items-center">
                        <div className="inline-flex gap-2">
                            <h3 className="text-[#797979] text-sm">Calender view</h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 2V6" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="inline-flex gap-2">
                            <h3 className="text-[#797979] text-sm">Automation</h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 15C12.8747 15 15 12.949 15 8C15 12.949 17.1104 15 22 15C17.1104 15 15 17.1104 15 22C15 17.1104 12.8747 15 8 15Z" stroke="#797979" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M2 6.5C5.13376 6.5 6.5 5.18153 6.5 2C6.5 5.18153 7.85669 6.5 11 6.5C7.85669 6.5 6.5 7.85669 6.5 11C6.5 7.85669 5.13376 6.5 2 6.5Z" stroke="#797979" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="inline-flex gap-2">
                            <h3 className="text-[#797979] text-sm">Filter</h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.99951 3H19.9996C20.5519 3 20.9996 3.44764 20.9996 3.99987L20.9998 5.58569C20.9999 5.85097 20.8945 6.10538 20.7069 6.29295L14.2924 12.7071C14.1049 12.8946 13.9995 13.149 13.9995 13.4142V19.7192C13.9995 20.3698 13.3881 20.8472 12.757 20.6894L10.757 20.1894C10.3118 20.0781 9.99951 19.6781 9.99951 19.2192V13.4142C9.99951 13.149 9.89415 12.8946 9.70662 12.7071L3.2924 6.29289C3.10486 6.10536 2.99951 5.851 2.99951 5.58579V4C2.99951 3.44772 3.44722 3 3.99951 3Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="inline-flex gap-2">
                            <h3 className="text-[#797979] text-sm">Share</h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.5 6.5L8.5 10.5" stroke="#797979" stroke-width="1.5" />
                                <path d="M8.5 13.5L15.5 17.5" stroke="#797979" stroke-width="1.5" />
                            </svg>
                        </div>
                        <button onClick={() => openModal('toDo')} className="flex justify-center bg-gradient-to-b rounded-md text-sm p-2 items-center gap-1 from-[#5949ba] to-[#33248e]">
                            Create new
                            <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 1.25C6.56294 1.25 1.75 6.06294 1.75 12C1.75 17.9371 6.56294 22.75 12.5 22.75C18.4371 22.75 23.25 17.9371 23.25 12C23.25 6.06294 18.4371 1.25 12.5 1.25ZM13.25 8C13.25 7.58579 12.9142 7.25 12.5 7.25C12.0858 7.25 11.75 7.58579 11.75 8V11.25H8.5C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75H11.75V16C11.75 16.4142 12.0858 16.75 12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16V12.75H16.5C16.9142 12.75 17.25 12.4142 17.25 12C17.25 11.5858 16.9142 11.25 16.5 11.25H13.25V8Z" fill="white" />
                            </svg>
                        </button>
                        {isModalOpen && currentStatus && (
                            <div>
                                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
                                    onClick={closeModal}
                                ></div>
                                <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform duration-700 ease-in-out translate-x-0">
                                    <Task_modal
                                        status={currentStatus}
                                        closeModal={closeModal}
                                        open={isModalOpen}
                                        onClose={closeModal}
                                        onTaskAdded={handleTaskAdded}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3 bg-[#FFFFFF] w-full flex justify-between rounded-lg gap-3 p-3">

                    {error && <p className="text-red-500">{error}</p>}
                    {['toDo', 'inProgress', 'underReview', 'finished'].map((status) => (
                        <div key={status}
                            onDrop={() => handleDrop(status)}
                            onDragOver={handleDragOver}
                            className="flex flex-col w-full">
                            <div className="flex justify-between">
                                <h2 style={{fontFamily: "Inter", fontWeight: 400, }} className="text-[#555555] w-fit text-md">{statusMapping[status] || status}</h2>
                                <svg width="18" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 5H11.75" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.75 12H16.75" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.75 19H21.75" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>

                            {/* Drag and drop */}
                            {tasks.filter((task) => task.status === status).map((task) => (
                                <div key={task._id}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, task)}
                                    onDragEnd={handleDragEnd}
                                    onDrop={() => handleDrop(status)}
                                    onDragOver={handleDragOver}
                                    className="flex flex-col bg-[#F4F4F4] border-[1px] border-[#DDDDDD] rounded-md p-2 mt-3">
                                    <h2 style={{fontFamily: "Inter", fontWeight: 500}} className="text-[#606060] text-sm ">{task.title}</h2>
                                    <p className="text-[#797979] text-xs">{task.description}</p>
                                    <span className={`mt-2 text-xxs w-fit ${getPriorityColor(task.priority)} rounded-md p-1`}>
                                        {task.priority}
                                    </span>
                                    <div className="mt-2 inline-flex gap-1">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6V12H18" stroke="#606060" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#606060" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <h4 className="text-[#606060] text-xxs font-bold">{new Date(task.deadline).toLocaleDateString()}</h4>
                                    </div>
                                    <h4 className="mt-2 font-bold text-[#797979] text-xxs">{timeAgo(task.createdAt)}</h4>
                                </div>
                            ))}

                            <button onClick={() => openModal(status)} className="flex justify-between mt-3 rounded-lg p-2 bg-gradient-to-b from-[#393939] to-[#222222]">
                                <h3 style={{fontFamily: "Inter", fontSize: "14px", alignItems: "center", color: "#E3E1E1"}}>Add new</h3>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18" stroke="#E3E1E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;