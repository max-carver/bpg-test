import { NextResponse } from "next/server";

import { sendPingSchema } from "@/lib/zodSchemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { pings } from "@/server/db/schema";

export const POST = auth(async function POST(request, { params }) {
  const validatedFields = sendPingSchema.safeParse(await request.json());

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
  const { id } = await params;

  const { data } = validatedFields;

  if (request.auth) {
    // if (data.userId !== null) {
    //   //Respond to their own ping
    // } else {
    await db.insert(pings).values({
      user_id: request.auth.user.id,
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parent_ping_id: id,
    });

    return NextResponse.json(
      {
        message: `Ping sent! (${data.latitude} ${data.longitude})`,
        success: true,
        data,
      },
      { status: 200 },
    );
    // }
  } else {
    return NextResponse.json(
      { message: "Not authenticated", success: false },
      { status: 401 },
    );
  }
});
