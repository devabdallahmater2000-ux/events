'use server';

import { Booking } from "@/database";
import connectDB from "../mongoedb";


export const createBooking = async (state: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const eventId = formData.get("eventId") as string;
  const slug = formData.get("slug") as string;

    try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    return { success: true , message : 'Booking created successfully' };
  } catch (error) {
    console.error("createBooking failed:" + error);
    return {
      success: false,
      message : 'Booking failed'
    };
  }
  
}