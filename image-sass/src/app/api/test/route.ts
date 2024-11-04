import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import z from "zod";

const inputSchema = z.object({
    name: z.string().max(10).min(3),
    email: z.string().email(),
});

export function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams;

    const name = query.get("name");
    const email = query.get("email");

    const result = inputSchema.safeParse({
        name,
        email,
    });

    if (result.success) {
        return NextResponse.json(result.data);
    } else {
        return NextResponse.json({ error: result.error.message });
    }
}
