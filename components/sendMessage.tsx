"use client"

import axios from "axios";

export const MessageInput = () => {
    const onSubmit = async () => {
        try {
            const message = "HELLO FROM BUTTON :)"
            const url = "/api/socket/onMessage";
            const res = await axios.post(url, {
                event: 'message',
                data: message
            });

            console.log(res.status)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={onSubmit} className="bg-blue-500 rounded-lg p-5">
                Click to send a message to server
            </button>
        </>
    )
}