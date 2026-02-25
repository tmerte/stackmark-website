import { NextResponse } from "next/server";
import { promises as dns } from "dns";

async function domainExists(domain: string): Promise<boolean> {
    // Try MX records first (best signal)
    try {
        const mx = await dns.resolveMx(domain);
        if (mx.length > 0) return true;
    } catch { /* no MX, try fallbacks */ }

    // Fall back to A/AAAA records (domain exists but no email config yet)
    try {
        const a = await dns.resolve4(domain);
        if (a.length > 0) return true;
    } catch { /* no A records */ }

    try {
        const aaaa = await dns.resolve6(domain);
        if (aaaa.length > 0) return true;
    } catch { /* no AAAA records */ }

    return false;
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ valid: false });
        }

        const domain = email.split("@")[1];
        const valid = await domainExists(domain);
        return NextResponse.json({ valid });
    } catch {
        return NextResponse.json({ valid: false });
    }
}
