import { rateLimit } from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 5 login attempts per windowMs
    message: "Too many request attempts from this IP, please try again after some time",
});