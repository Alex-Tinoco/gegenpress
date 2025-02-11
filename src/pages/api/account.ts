import { createAccount } from "@/lib/auth/account";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { action, data } = req.body;

      switch (action) {
        case "createAccount":
          try {
            console.log(data);
            const user = await createAccount(data);
            res.status(200).json(user);
          } catch (error) {
            res.status(500).json({ error });
          }
          break;

        // case "login":
        //   try {
        //     const user = await login(email, password);
        //     res.status(200).json(user);
        //   } catch (error) {
        //     res.status(401).json({ error: error.message });
        //   }
        //   break;

        default:
          res.setHeader("Allow", ["POST"]);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
