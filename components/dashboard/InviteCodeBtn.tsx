import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getInviteCode } from "@/server/socket/get-invite-code"
import { useOrigin } from "@/hooks/use-origin"

export const InviteCodeBtn = ({ roomId }: { roomId: string }) => {

    const origin = useOrigin() 
    
    const onClick = () => {
        getInviteCode({ room_id: roomId }).then((inviteCode) => {
            if (!inviteCode) {
                toast.error("Something went wrong!")
                return
            }

            toast.success("Copied Invite Code!")
            navigator.clipboard.writeText(`${origin}/socketio/${roomId}/${inviteCode}`)
        })

    }

    return (
        <Button variant={"default"} onClick={onClick}>Invite Code</Button>
    )

}