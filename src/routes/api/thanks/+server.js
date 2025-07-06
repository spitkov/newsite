import { json } from "@sveltejs/kit";
import { getStore } from "@netlify/blobs";

export async function GET(event) {
  const store = getStore("thanks");
  try {
    const count = await store.get("count", { type: "json" });
    return json({ count: count ?? 0 });
  } catch (error) {
    console.error("Failed to read from blob store:", error);
    return json({ count: 0, error: "Failed to read from store" }, { status: 500 });
  }
}

export async function POST(event) {
  const store = getStore("thanks");
  try {
    const current = (await store.get("count", { type: "json" })) ?? 0;
    const updated = current + 1;
    await store.setJSON("count", updated);
    return json({ count: updated });
  } catch (error) {
    console.error("Failed to update blob store:", error);
    return json({ count: 0, error: "Failed to update store" }, { status: 500 });
  }
}
