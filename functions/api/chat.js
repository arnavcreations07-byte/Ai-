export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();

    const response = await fetch("https://api.longcat.chat/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization: "Bearer ak_27K4xF3jh8aA0gz8Dg39o0ag1mi5d",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "LongCat-2.0",
        messages: body.messages,
        max_tokens: body.max_tokens || 1000
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
