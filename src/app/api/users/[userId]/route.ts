import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { editUserSchema } from "@/lib/zodSchemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const PUT = auth(async function PUT(request, { params }) {
  const validatedFields = editUserSchema.safeParse(await request.json());

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: validatedFields.error,
        success: false,
        error: validatedFields.error,
      },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { userId } = await params;

  const { data } = validatedFields;

  if (request.auth) {
    await db
      .update(users)
      .set({
        id: userId as string,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      })
      .where(eq(users.id, userId as string));

    return NextResponse.json(
      {
        message: `User updated!`,
        success: true,
        data,
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
