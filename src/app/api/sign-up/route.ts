import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { signUpSchema } from "@/lib/zodSchemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const POST = auth(async function POST(request) {
  const validatedFields = signUpSchema.safeParse(await request.json());

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        success: false,
      },
      { status: 400 },
    );
  }

  const { data } = validatedFields;

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 409 },
      );
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    await db.insert(users).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: `User created successfully`,
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
});
