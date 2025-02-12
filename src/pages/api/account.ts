import {
  createAccount,
  findUserByEmail,
  retrievePassword,
} from "@/lib/auth/account";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { action, data } = req.body;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  switch (action) {
    case "checkAccount":
      try {
        const user = await findUserByEmail(data.email);
        if (user) {
          //if user exists, check if password is correct
          try {
            const password = await retrievePassword(user.id);
            if (await bcrypt.compare(data.password, password.password.hash)) {
              return res.status(200);
            }
          } catch (error) {
            return res.status(401);
          }
        } else {
          //if user doesn't exist, create session with password
          return res.status(202);
        }
      } catch (error) {
        res.status(500).json({ error: "Error while checking account" });
      }
      break;

    case "createAccount":
      try {
        const user = await createAccount(data);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Action Not Allowed`);
      break;
  }
}
