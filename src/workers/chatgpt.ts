import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const gptResponse = async (message: string) => {
  console.log("SENDING ...");
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a travel specialist. User can give incorrect prompts. It's your job to understand and meet their requirement.

          Your task is to extract **up to 15** tourist attractions or destinations that are **geographically relevant** to the user's query. Prefer famous or locally popular spots.

          Most of the time, the user will mention their current city or destination (like "Delhi trip for 2 days").

          You MUST return your answer as a valid JSON object:
          - Use **double quotes** for all keys and string values
          - Do NOT include markdown or explanations
          - Format exactly like:

          {
            "places_for_lookup": [
              "Red Fort",
              "India Gate",
              ...
            ]
          }`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "openai/gpt-oss-20b",
    temperature: 1,
    max_completion_tokens: 8192,
    top_p: 1,
    stream: true,
    reasoning_effort: "medium",
    stop: null,
  });

  let response = "";
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || "";
  }

  console.log(response);
  return response;
};

const getPlaceDescription = async (placeName: string, address: string) => {
  console.log("SENDING ...");
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert travel assistant.
          
          Write:
          1. A short 1 to 2 line description of the place called "${placeName}", located at "${address}".
          2. A 1-line tourist review for it.
          3. A realistic average rating between 4.0 and 5.0.

          You MUST return your answer as a valid JSON object:
          - Use **double quotes** for all keys and string values
          - Do NOT include markdown or explanations
          - Format exactly like:

          {
            "description": "...",
            "review": "...",
            "ratings": 4.5
          }`,
      },
    ],
    model: "openai/gpt-oss-20b",
    temperature: 1,
    max_completion_tokens: 8192,
    top_p: 1,
    stream: true,
    reasoning_effort: "medium",
    stop: null,
  });

  let response = "";
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || "";
  }

  console.log(response);
  return response;
};

export { gptResponse, getPlaceDescription };
