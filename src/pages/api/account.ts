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

  switch (action) {
    case "checkAccount":
      try {
        const user = await findUserByEmail(data.email);
        if (user) {
          try {
            const password = await retrievePassword(user.id);
            if (await bcrypt.compare(data.password, password.password.hash)) {
              res.status(200).end();
            } else {
              res.status(401).end();
            }
          } catch (error) {
            res.status(401).end();
          }
        } else {
          res.status(202).end();
        }
      } catch (error) {
        res.status(500).end();
      }
      break;

    case "createAccount":
      try {
        const user = await findUserByEmail(data.email);
        console.log(user);
        if (!user) {
        try {
          await createAccount(data);
          res.status(200).end();
        } catch (error) {
          res.status(500).end();
        }
      } else {
        res.status(500).json("Account already exists");
      }
    } catch (error) {
      res.status(500).json("error");
    }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end();
      break;
  }
}
