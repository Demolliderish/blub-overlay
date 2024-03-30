import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: 'What should we call you?'
    }),
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    confirmPassword: z.string().min(1, {
        message: "Please confirm your password"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});