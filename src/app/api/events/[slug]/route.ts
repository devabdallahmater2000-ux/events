import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoedb";
import { Event } from "@/database";


type Params = 
{ params: Promise<{ slug: string }>
 };

export async function GET(req: NextRequest, { params }: Params) {
	try {
		await connectDB();

		const { slug } = await params;
		if (!slug) {
			return NextResponse.json({ message: "Slug is required" }, { status: 400 });
		}

		const event = await Event.findOne({ slug });
		if (!event) {
			return NextResponse.json({ message: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });
	} catch (error) {
		console.error("GET /api/events/[slug] error:", error);
		return NextResponse.json(
			{ message: "Failed to fetch event", error: error instanceof Error ? error.message : error },
			{ status: 500 }
		);
	}
}



