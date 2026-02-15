import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Server-side validation
        const { email, savedTutorials, barriers, wouldPay, primaryTools, primaryToolOther } = data;

        if (!email || !savedTutorials || !wouldPay || !primaryTools || !Array.isArray(primaryTools) || primaryTools.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        if (primaryTools.includes("Other (please specify)") && (!primaryToolOther || !primaryToolOther.trim())) {
            return NextResponse.json({ error: "Please specify your design tool" }, { status: 400 });
        }

        // Build the tools string for storage
        const toolsList = primaryTools.map((tool: string) =>
            tool === "Other (please specify)" ? `Other: ${primaryToolOther}` : tool
        ).join(", ");

        // Forward to Google Sheets webhook
        const webhookUrl = process.env.SURVEY_WEBHOOK_URL;

        if (webhookUrl) {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    savedTutorials,
                    barriers: barriers || "",
                    wouldPay,
                    primaryTools: toolsList,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                console.error("Webhook failed:", response.status);
                return NextResponse.json({ error: "Submission failed" }, { status: 500 });
            }
        } else {
            // If no webhook configured, log to server console for development
            console.log("Survey submission (no webhook configured):", {
                email,
                savedTutorials,
                barriers: barriers || "",
                wouldPay,
                primaryTools: toolsList,
                submittedAt: new Date().toISOString(),
            });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
