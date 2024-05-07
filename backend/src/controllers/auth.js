import userModel from "../models/user.js";
import auth from "../utils/auth.js";
import {apiLimiter} from "../utils/rateLimits.js";

const signup = async (req, res) => {
    apiLimiter(req, res, async () => {
        try {
            const existingUser = await userModel.findOne({email: req.body.email});

            if (!existingUser) {
                const hashedPassword = await auth.hashPassword(req.body.password);
                await userModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });

                res.status(201).send({
                    message: "User created successfully",
                });
            } else {
                res.status(400).send({
                    message: `User with email ${req.body.email} already exists`,
                });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send({
                message: "Internal Server error",
                error: error.message,
            });
        }
    });
};

const login = async (req, res) => {
    apiLimiter(req, res, async () => {
        try {
            let user = await userModel.findOne({email: req.body.email});
            if (user) {
                let hashCompare = await auth.hashCompare(
                    req.body.password,
                    user.password
                );

                if (hashCompare) {
                    let token = auth.createToken({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        status: user.status,
                    });

                    let userData = await userModel.findOne(
                        {email: req.body.email},
                        {_id: 0, password: 0, createdAt: 0, email: 0}
                    );
                    res.status(200).send({
                        message: "Authorization successful",
                        token,
                        userData,
                    });
                } else {
                    res.status(400).send({
                        message: `Invaild Passsword`,
                    });
                }
            } else {
                res.status(400).send({
                    message: `Account with "${req.body.email}" does not exists!`,
                });
            }
        } catch (error) {
            res.status(500).send({
                message: `Internal Server Error `,
                error: error.message,
            });
        }
    });
};

export {signup, login};
