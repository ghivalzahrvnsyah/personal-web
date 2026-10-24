const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const jsonResponse = (body: Record<string, unknown>, status: number, origin: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json",
    },
  });

Deno.serve(async (request: Request) => {
  const configuredOrigins = (Deno.env.get("ALLOWED_ORIGIN") ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const requestOrigin = request.headers.get("origin");
  const originIsAllowed = !requestOrigin ||
    configuredOrigins.length === 0 ||
    configuredOrigins.includes(requestOrigin);
  const responseOrigin = requestOrigin && configuredOrigins.includes(requestOrigin)
    ? requestOrigin
    : configuredOrigins[0] || "*";

  if (request.method === "OPTIONS") {
    return new Response("ok", {
      status: originIsAllowed ? 200 : 403,
      headers: corsHeaders(responseOrigin),
    });
  }

  if (!originIsAllowed) {
    return jsonResponse({ error: "Origin tidak diizinkan." }, 403, responseOrigin);
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method tidak diizinkan." }, 405, responseOrigin);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL");
  const toEmail = Deno.env.get("CONTACT_TO_EMAIL");

  if (!resendApiKey || !fromEmail || !toEmail) {
    console.error("Missing required contact email secrets.", {
      RESEND_API_KEY: Boolean(resendApiKey),
      CONTACT_FROM_EMAIL: Boolean(fromEmail),
      CONTACT_TO_EMAIL: Boolean(toEmail),
    });
    return jsonResponse({ error: "Pengiriman email belum dikonfigurasi." }, 500, responseOrigin);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Body harus berupa JSON yang valid." }, 400, responseOrigin);
  }

  if (!payload || typeof payload !== "object") {
    return jsonResponse({ error: "Data form tidak valid." }, 400, responseOrigin);
  }

  const { name, email, message } = payload as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return jsonResponse({ error: "Nama, email, dan pesan wajib diisi." }, 400, responseOrigin);
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!cleanName || cleanName.length > 100) {
    return jsonResponse({ error: "Nama wajib diisi (maksimal 100 karakter)." }, 400, responseOrigin);
  }
  if (!emailPattern.test(cleanEmail) || cleanEmail.length > 254) {
    return jsonResponse({ error: "Format email tidak valid." }, 400, responseOrigin);
  }
  if (!cleanMessage || cleanMessage.length > 1000) {
    return jsonResponse({ error: "Pesan wajib diisi (maksimal 1000 karakter)." }, 400, responseOrigin);
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        subject: "Pesan baru dari form Contact",
        text: `Nama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend email request failed:", resendResponse.status, errorBody);
      return jsonResponse({ error: "Pesan gagal dikirim. Silakan coba lagi nanti." }, 502, responseOrigin);
    }
  } catch (error) {
    console.error("Could not reach Resend API:", error);
    return jsonResponse({ error: "Pesan gagal dikirim. Silakan coba lagi nanti." }, 502, responseOrigin);
  }

  return jsonResponse({ success: true }, 200, responseOrigin);
});
