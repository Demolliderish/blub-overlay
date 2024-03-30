import { CiWarning } from "react-icons/ci";

interface FormErrorProps {
    message?: string
}

export const FormError = ({
    message,
}: FormErrorProps) => {
    if (!message) return null
    return (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm">
            <CiWarning className="w-5 h-5" />
            <p>{message}</p>
        </div>
    )
}