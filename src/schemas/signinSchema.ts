import {z} from "zod"

export const signinSchema = z.object({
    email : z
        .string()
        .regex( /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z
        .string()
})
