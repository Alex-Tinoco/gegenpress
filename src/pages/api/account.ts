import {
  createAccount,
  findUserByEmail,
  retrievePassword,
} from "@/lib/auth/accountdb";
import {
  setTokenCookies,
  signAccessToken,
  signRefreshToken,
} from "@/lib/auth/jwt";
import { Payload } from "@models/authmodel";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { action, data } = req.body;

  switch (action) {
    case "checkAccount":
      try {
        const user = await findUserByEmail(data.email);
        console.log(user);
        console.log("Executing checkAccount");

        if (user) {
          try {
            const password = await retrievePassword(user.id);
            if (await bcrypt.compare(data.password, password.password.hash)) {
              let payload: Payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                memory: data.memory,
              };

              setTokenCookies(
                res,
                signAccessToken(payload),
                payload.memory ? signRefreshToken(payload) : undefined,
              );

              res.status(200).end();
            } else {
              res.status(401).json({ error: "Unauthorized: Invalid password" });
            }
          } catch (error) {
            console.error("Error retrieving password:", error);
            res
              .status(401)
              .json({ error: "Unauthorized: Error retrieving password" });
          }
        } else {
          res
            .status(202)
            .json({ message: "No user found. Please create an account." });
        }
      } catch (error) {
        console.error("Error checking account:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "createAccount":
      try {
        console.log("Executing createAccount");

        const user = await findUserByEmail(data.email);
        if (!user) {
          try {
            await createAccount(data);
            res.status(200).json({ message: "Account Created" });
          } catch (error) {
            console.error("Error creating account:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
        } else {
          res.status(409).json({ error: "Conflict: User already exists" });
        }
      } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end();
      break;
  }
}
