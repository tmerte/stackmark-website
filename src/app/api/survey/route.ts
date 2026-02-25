import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { email } = data;

        if (!email) {
            return NextResponse.json({ error: "Missing email" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const webhookUrl = process.env.SURVEY_WEBHOOK_URL;

        if (webhookUrl) {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                console.error("Webhook failed:", response.status);
                return NextResponse.json({ error: "Submission failed" }, { status: 500 });
            }
        } else {
            console.log("Survey submission (no webhook configured):", {
                email,
                submittedAt: new Date().toISOString(),
            });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
