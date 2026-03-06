import { NextResponse } from "next/server";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, propertyAddress, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Log submission (prepare for email integration later)
    const submission = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      propertyAddress: propertyAddress ? propertyAddress.trim() : null,
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    };

    console.log("[Contact Form] New submission:", JSON.stringify(submission, null, 2));

    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. We will be in touch soon.",
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
