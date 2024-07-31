"use client"
import Login from "@/app/signin/page";

interface TaskModalProps {
  closeModal: () => void;
  openModal: () => void;
}

export default function Home({closeModal, openModal}: TaskModalProps) {
  return (
    <Login />
  );
}

