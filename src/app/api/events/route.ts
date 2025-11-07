import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoedb";
import fs from "fs/promises";
import path from "path";
import { Event } from "@/database";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // استخراج الحقول النصية
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const overview = formData.get("overview")?.toString() || "";
    const venue = formData.get("venue")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const time = formData.get("time")?.toString() || "";
    const mode = formData.get("mode")?.toString() || "";
    const audience = formData.get("audience")?.toString() || "";
    const organizer = formData.get("organizer")?.toString() || "";

    // const agenda = (formData.get("agenda")?.toString() || "")
    //   .split(",")
    //   .map((a) => a.trim());

    // const tags = (formData.get("tags")?.toString() || "")
    //   .split(",")
    //   .map((t) => t.trim());

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    // رفع الصورة
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image too large (>5MB)" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // إنشاء الحدث
    const newEvent = await Event.create({
      title,
      description,
      overview,
      image: imageUrl,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      organizer,
      agenda,
      tags,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event creation failed:", error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Events fetched failed", error },
      { status: 500 }
    );
  }
}
