
import Image from "next/image";
import { SocketProvider } from "@/components/providers/socket-provider";
import { SocketIndicator } from "@/components/indicators/socket-indicator";

import { MessageInput } from "@/components/dashboard/sendMessage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Login/Signup Boilerplate</h1>
      <div className="flex gap-[1vmax] mt-[2vmax]">
  
      </div>
    </div>
  );
}
