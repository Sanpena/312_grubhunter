import dbConnect from "middleware/mongodb";
import { findAllLocations } from "mongoose/locations/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    await dbConnect();
    const data = await findAllLocations();
    res.status(200).json(data);
}