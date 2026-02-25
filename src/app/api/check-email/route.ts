import { NextResponse } from "next/server";
import { promises as dns } from "dns";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ valid: false });
        }

        const domain = email.split("@")[1];
        const records = await dns.resolveMx(domain);
        return NextResponse.json({ valid: records.length > 0 });
    } catch {
        return NextResponse.json({ valid: false });
    }
}
