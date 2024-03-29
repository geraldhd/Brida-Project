import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);

  try {
    const isUserExist = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (isUserExist) {
      return res.status(400).json({
        message: "A user with this email is already exist. Please choose another one",
      });
    }
    const hashPassword = await argon2.hash(data.password);
    const response = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: hashPassword,
        role: data.role,
      },
    });

    res.status(200).json({
      username: response.username,
      email: response.email,
      role: response.role,
      message: "User registered",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong on the server, please try again later",
    });
  }
}
