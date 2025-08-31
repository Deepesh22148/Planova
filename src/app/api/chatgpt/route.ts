import { gptResponse } from "@/workers/chatgpt";
import { NextRequest, NextResponse } from "next/server";

function cleanString(input: string): string {
  // Remove Markdown code block markers and trim whitespace
  return input
    .replace(/```(?:json)?/gi, "")
    .replace(/```/g, "")
    .trim();
}
function fixQuotesForJSON(input: string): string {
  return (
    input
      .replace(/([{,]\s*)'([^']+?)'\s*:/g, '$1"$2":')
      .replace(/:\s*'([^']*?)'/g, (_, val) => {
        const escaped = val.replace(/"/g, '\\"').replace(/'/g, "\\'");
        return `: "${escaped}"`;
      })

      .replace(/'\s*([^']*?)\s*'/g, (_, val) => `"${val.replace(/"/g, '\\"')}"`)
  );
}

function safeParse(input: string) {
  try {
    // if (typeof input === "object") return input;

    // const cleaned = cleanString(input);
    // const jsonReady = fixQuotesForJSON(cleaned);

    // console.log("JSONReady :", jsonReady);

    return JSON.parse(input);
  } catch (err) {
    console.error("Failed to parse:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const { userResponse } = await req.json();

    // generating user response
    const gptSuggestion = await gptResponse(userResponse);
    const receivedResponse = safeParse(gptSuggestion);

    return NextResponse.json({
      message: "Received POST request",
      data: userResponse,
      suggestion: receivedResponse,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: (error as Error).message },
      { status: 500 }
    );
  }
}
