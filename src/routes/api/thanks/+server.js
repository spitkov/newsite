import { json } from "@sveltejs/kit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const thanksFilePath = path.join(
  __dirname,
  "../../../../static/data/thanks.json",
);

// Ensure the data directory exists
const dataDir = path.join(__dirname, "../../../../static/data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize the thanks file if it doesn't exist
if (!fs.existsSync(thanksFilePath)) {
  fs.writeFileSync(thanksFilePath, JSON.stringify({ count: 0 }));
}

// GET handler to retrieve the current thanks count
export async function GET() {
  try {
    const data = await JSON.parse(fs.readFileSync(thanksFilePath, "utf8"));
    return json(data);
  } catch (error) {
    console.error("Error reading thanks count:", error);
    return json({ count: 0 });
  }
}

// POST handler to increment the thanks count
export async function POST() {
  try {
    let data = { count: 0 };

    // Read existing data if file exists
    if (fs.existsSync(thanksFilePath)) {
      data = JSON.parse(fs.readFileSync(thanksFilePath, "utf8"));
    }

    // Increment the count
    data.count += 1;

    // Save the updated count
    fs.writeFileSync(thanksFilePath, JSON.stringify(data));

    return json(data);
  } catch (error) {
    console.error("Error updating thanks count:", error);
    return json(
      { count: 0, error: "Failed to update thanks count" },
      { status: 500 },
    );
  }
}
