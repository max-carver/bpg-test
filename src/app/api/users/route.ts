import bcrypt from "bcrypt";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { addUserSchema } from "@/lib/zodSchemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const POST = auth(async function POST(request) {
  const validatedFields = addUserSchema.safeParse(await request.json());

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

  if (request.auth) {
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

      const hashedPassword = await bcrypt.hash(data.password, 10);

      await db.insert(users).values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
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
  } else {
    return NextResponse.json(
      { message: "Not authenticated", success: false },
      { status: 401 },
    );
  }
});

export const GET = auth(async function GET(request) {
  if (request.auth) {
    const allUsers = await db
      .select({
        id: users.id,
        first_name: users.firstName,
        last_name: users.lastName,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .orderBy(desc(users.lastName));

    return NextResponse.json(
      {
        message: "Users fetched successfully",
        success: true,
        data: allUsers,
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "Not authenticated", success: false },
      { status: 401 },
    );
  }
});
