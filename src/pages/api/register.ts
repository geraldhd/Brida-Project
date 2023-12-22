import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log(data);

  const jwtToken = jwt.sign(
    {
      username: data.username,
      email: data.email,
      role: data.role,
    },
    "kinguta"
  );

  try {
    const hashPassword = await argon2.hash(data.password);
    const response = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: hashPassword,
        role: data.role,
      },
    });

    // res.setHeader("Set-Cookie", `token=${jwtToken};`);
    // res.status(200).json({
    //   username: response.username,
    //   email: response.email,
    //   role: response.role,
    //   token: jwtToken,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Terjadi kesalahan saat menyimpan data",
    });
  }
}
