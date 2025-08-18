import {z} from "zod";

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(2 ,"Name must be at least 2 characters") ,

    address : z.string() ,
    email : z
        .string()
        .regex( /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    phone : z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    password: z
        .string()
        .min(8 ,"Password must be at least 8 characters") ,
    confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})
