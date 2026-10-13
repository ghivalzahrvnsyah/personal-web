import type { ContactPayload, SendResult } from "@/features/contact/types/contact.types";

export async function sendMessage(_payload: ContactPayload): Promise<SendResult> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 600));
  return { success: true };
}
