import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { sendPingSchema } from "@/lib/zodSchemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { pings, users } from "@/server/db/schema";

export const POST = auth(async function POST(request) {
  const validatedFields = sendPingSchema.safeParse(await request.json());

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
    await db.insert(pings).values({
      user_id: request.auth.user.id,
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
      parent_ping_id: data.parentPingId,
    });
    return NextResponse.json(
      {
        message: `Ping sent! (${data.latitude} ${data.longitude})`,
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

export const GET = auth(async function GET(request) {
  if (request.auth) {
    const allPings = await db
      .select({
        id: pings.id,
        latitude: pings.latitude,
        longitude: pings.longitude,
        created_at: pings.created_at,
        parent_ping_id: pings.parent_ping_id,
        user_id: pings.user_id,
        user_first_name: users.firstName,
        user_last_name: users.lastName,
      })
      .from(pings)
      .leftJoin(users, eq(pings.user_id, users.id))
      .orderBy(desc(pings.created_at));

    return NextResponse.json(
      {
        message: "Pings fetched successfully",
        success: true,
        data: allPings,
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
