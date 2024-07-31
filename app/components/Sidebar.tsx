"use client"
import profile_icon from "../assets/profile_icon.png";
import Image from "next/image";
import { useAuth } from '../context/AuthContext'; 

interface TaskModalProps {
    openModal: (status: string) => void;
    onLogout: () => void;
}

export default function Sidebar({ openModal, onLogout }: TaskModalProps) {
    const { userFullName } = useAuth();

    return (
        <div className="w-[15%] h-screen flex-grow bg-[#FFFFFF] border-[2px] border-[#DEDEDE] flex flex-col justify-between">
            <div className="flex flex-col p-3">
                <div className="inline-flex gap-2 items-center">
                    <Image src={profile_icon} alt="Profile Icon" width={30} height={30} />
                    <h1 style={{ fontFamily: "Inter"}} className="text-[#080808] font-bold text-sm">{userFullName}</h1>
                </div>
                <div className="flex justify-between mt-3">
                    <div className="inline-flex gap-2 items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V6" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18V22" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12H18" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 12H2" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.9292 4.92896L7.75762 7.75738" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.2427 16.2427L19.0711 19.0711" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.0711 4.92896L16.2427 7.75738" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.75713 16.2427L4.92871 19.0711" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 9C21.9854 9 24 6.98527 24 4.5C24 2.01472 21.9854 0 19.5 0C17.0146 0 15 2.01472 15 4.5C15 6.98527 17.0146 9 19.5 9Z" fill="#FFB800" />
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 6L19 12L13 18" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 6L11 12L5 18" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <button onClick={onLogout} className="text-xs text-[#797979] bg-[#F4F4F4] p-2 rounded-md">
                        Logout
                    </button>
                </div>
                <div className="mt-3">
                    <div className="w-full items-center p-2 inline-flex gap-2 bg-[#F4F4F4] border-[1px] border-[#DDDDDD] rounded-md">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 7.99998L11.7317 3.13414C11.9006 3.04969 12.0994 3.04968 12.2683 3.13414L22 7.99998" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <text style={{fontFamily: "Inter", }} className="text-md text-[#797979]">Home</text>
                    </div>
                    <div className="w-full p-2 inline-flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6V16" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 6V9" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 6V13" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 6V11" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <text style={{fontFamily: "Inter", }} className="text-md text-[#797979]">Boards</text>
                    </div>
                    <div className="w-full p-2 inline-flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <text style={{fontFamily: "Inter", }} className="text-md text-[#797979]">Settings</text>
                    </div>
                    <div className="w-full p-2 inline-flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 20V19C1 15.134 4.13401 12 8 12C11.866 12 15 15.134 15 19V20" stroke="#797979" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M13 14C13 11.2386 15.2386 9 18 9C20.7614 9 23 11.2386 23 14V14.5" stroke="#797979" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <text style={{fontFamily: "Inter", }} className="text-md text-[#797979]">Teams</text>
                    </div>
                    <div className="w-full p-2 inline-flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20H4V4" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <text style={{fontFamily: "Inter", }} className="text-md text-[#797979]">Analytics</text>
                    </div>
                </div>
                <button onClick={() => openModal('toDo')} className="flex justify-center bg-gradient-to-b rounded-md text-sm p-2 items-center gap-1 from-[#5949ba] to-[#33248e] mt-2">
                    Create new task
                    <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 1.25C6.56294 1.25 1.75 6.06294 1.75 12C1.75 17.9371 6.56294 22.75 12.5 22.75C18.4371 22.75 23.25 17.9371 23.25 12C23.25 6.06294 18.4371 1.25 12.5 1.25ZM13.25 8C13.25 7.58579 12.9142 7.25 12.5 7.25C12.0858 7.25 11.75 7.58579 11.75 8V11.25H8.5C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75H11.75V16C11.75 16.4142 12.0858 16.75 12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16V12.75H16.5C16.9142 12.75 17.25 12.4142 17.25 12C17.25 11.5858 16.9142 11.25 16.5 11.25H13.25V8Z" fill="white" />
                    </svg>
                </button>
            </div>
            <div className="p-2 mt-auto">
                <footer className="bg-[#F4F4F4] rounded-md p-2 mt-3">
                    <div className="inline-flex items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 33.8335H30" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.9998 7.1665V27.1665M19.9998 27.1665L25.8332 21.3332M19.9998 27.1665L14.1665 21.3332" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className="flex flex-col">
                            <h1 className="text-[#666666] text-xs font-bold">
                                Download the app
                            </h1>
                            <h3 className="text-[#666666] text-xxs whitespace-nowrap ">
                                Get the full experience
                            </h3>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
