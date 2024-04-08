export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const form = await request.formData();
  return Response.json({
    access_token: form.get("code") || "invalid",
    token_type: "bearer",
  });
}
