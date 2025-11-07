import { Event } from "@/database";
import connectDB from "../mongoedb";

export const getSimilarEventsBySlug = async ( slug: string ) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    return await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags || [] },
    }).limit(3).lean();
  } catch {
    return [];
  }
};
