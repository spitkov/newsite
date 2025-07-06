import { json } from "@sveltejs/kit";
import { blobs } from "@netlify/blobs";

const store = blobs({ name: "thanks" });

export async function GET() {
  try {
    const value = await store.get("count");
    return json({ count: value ?? 0 });
  } catch {
    return json({ count: 0, error: "Failed to read" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const current = (await store.get("count")) ?? 0;
    const updated = current + 1;
    await store.set("count", updated);
    return json({ count: updated });
  } catch {
    return json({ count: 0, error: "Failed to update" }, { status: 500 });
  }
}
