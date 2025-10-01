
export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    const contentType = request.headers.get("content-type") || "";
    let form = {};
    if (contentType.includes("application/json")) {
      form = await request.json();
    } else {
      const fd = await request.formData();
      for (const [k,v] of fd.entries()) form[k] = v;
    }
    if (!form.name || !form.email) return new Response("Missing fields", { status: 400 });
    if (env.SENDGRID_API_KEY && env.SENDGRID_TO && env.SENDGRID_FROM) {
      const sgUrl = "https://api.sendgrid.com/v3/mail/send";
      const body = {
        personalizations: [{ to: [{ email: env.SENDGRID_TO }] }],
        from: { email: env.SENDGRID_FROM },
        subject: `Contact form: ${form.name} - ${form.urgency || ''}`,
        content: [{ type: "text/plain", value: `Name: ${form.name}\nEmail: ${form.email}\nMobile: ${form.mobile || ''}\nUrgency: ${form.urgency || ''}\nInterest: ${form.interest || ''}` }]
      };
      const resp = await fetch(sgUrl, { method: "POST", headers: { "Authorization": `Bearer ${env.SENDGRID_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!resp.ok) return new Response("Failed to send email", { status: 502 });
      return new Response("Email sent", { status: 200 });
    }
    return new Response(JSON.stringify(form, null, 2), { headers: { "Content-Type": "application/json" } });
  }
};
