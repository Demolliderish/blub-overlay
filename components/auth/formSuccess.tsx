import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({
    message,
}: FormSuccessProps) => {
    if (!message) return null
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500 text-sm">
            <IoIosCheckmarkCircleOutline className="w-5 h-5"  />
            <p>{message}</p>
        </div>
    )
}