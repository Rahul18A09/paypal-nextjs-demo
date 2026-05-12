import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const trimmedName = name?.trim();
    const normalizedEmail = email?.trim()?.toLowerCase();
    const rawPassword = password?.trim();

    if (
      !trimmedName ||
      !normalizedEmail ||
      !rawPassword ||
      rawPassword.length < 8
    ) {
      return Response.json(
        {
          message:
            "Invalid payload. Name, email and password (min 8 chars) are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      rawPassword,
      10
    );

    const createdUser = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return Response.json(
      {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}