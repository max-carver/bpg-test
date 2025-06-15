import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { pings, users } from "@/server/db/schema";

export const GET = auth(async function GET(request) {
  if (request.auth) {
    const recentPings = await db
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
      .where(eq(pings.user_id, request.auth.user.id))
      .leftJoin(users, eq(pings.user_id, users.id))
      .orderBy(desc(pings.created_at))
      .limit(3);

    return NextResponse.json(
      {
        message: "Pings fetched successfully",
        success: true,
        data: recentPings,
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
