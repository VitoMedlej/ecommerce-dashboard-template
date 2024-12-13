import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { file } = req.body;

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: "dashboard-uploads", // Optional folder for organization
      });
      console.log('uploadResponse: ', uploadResponse);

      return res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
