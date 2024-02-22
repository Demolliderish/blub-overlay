import Image from "next/image";
import { SocketProvider } from "@/components/providers/socket-provider";
import { SocketIndicator } from "@/components/indicators/socket-indicator";

import { MessageInput } from "@/components/sendMessage";

export default function Home() {
  return (
    <SocketProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
        <SocketIndicator />
        <MessageInput />
      </main>
    </SocketProvider>
  );
}
