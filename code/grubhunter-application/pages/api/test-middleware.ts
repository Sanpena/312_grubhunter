import dbConnect from "middleware/mongodb";
import Location from "mongoose/locations/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    await dbConnect();
    const data = await Location.find();
    res.status(200).json(data);
	
}