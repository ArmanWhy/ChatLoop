import rateLimit from "express-rate-limit";
import { ipKeyGenerator } from "express-rate-limit";
//General rate limiter per IP

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Message rate limiter per IP
export const messageLimiter = rateLimit({
    windowMs: 10 * 1000,   // 10 seconds
    max: 5,                // limit each IP to 5 requests per windowMs
    message: "You are sending message too quickly, Slow down!",
    keyGenerator: ipKeyGenerator ,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

