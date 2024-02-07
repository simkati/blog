// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { readPostsInfo } from "@/lib/helper";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const data = readPostsInfo();
      return res.json({ readPostsInfo: data });
    default:
      return res.status(404).send("Not Found");
  }
};

export default handler;
