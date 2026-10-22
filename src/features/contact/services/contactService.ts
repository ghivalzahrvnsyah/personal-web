import type { ContactPayload, SendResult } from "@/features/contact/types/contact.types";
import { supabase } from "@/lib/supabaseClient";

export async function sendMessage(payload: ContactPayload): Promise<SendResult> {
  const { data, error } = await supabase.functions.invoke<{ success: boolean }>("send-contact", {
    body: payload,
  });

  if (error) {
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response) {
      const responseBody = await context.clone().json().catch(() => null) as
        | { error?: unknown }
        | null;

      if (typeof responseBody?.error === "string") {
        throw new Error(responseBody.error);
      }
    }

    throw error;
  }

  if (data?.success !== true) {
    throw new Error("Function send-contact tidak mengembalikan status sukses.");
  }

  return { success: true };
}
