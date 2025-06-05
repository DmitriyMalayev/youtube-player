import { Webhook } from "svix";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import users from "@/db/schema"; // Adjust the import path as needed

export async function POST(req: Request) {
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;
  if (!CLERK_SIGNING_SECRET) {
    throw new Error(
      "CLERK_SIGNING_SECRET is not defined, please set it in your environment variables."
    );
  }
  const wh = new Webhook(CLERK_SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing required headers", { status: 400 });
  }

  const payload = await req.json(); //json version of the body
  const body = JSON.stringify(payload); //text version of the body
  let evt: WebhookEvent; // the parsed webhook event
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const eventType = evt.type; // assuming eventType is a string
  const id = evt.data.id; // assuming id is a string
  console.log(`Received event ${eventType} with ID ${id}`);
  console.log("Webhook payload:", payload);

  if (eventType === "user.created") {
    const { id, first_name, last_name, image_url } = evt.data; // assuming data contains an id field
    await db.insert(users).values({
      clerkId: id,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  if (eventType === "user.updated") {
    const { id, first_name, last_name, image_url } = evt.data; // assuming data contains an id field
    if (id) {
      await db
        .update(users)
        .set({
          name: `${first_name} ${last_name}`,
          imageUrl: image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id));
    }
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data; // assuming data contains an id field
    if (id) {
      await db.delete(users).where(eq(users.clerkId, id));
    }
  }
  return new Response("Webhook processed successfully", { status: 200 });
}
