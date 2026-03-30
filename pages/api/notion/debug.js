export default function handler(req, res) {
  res.status(200).json({
    NOTION_API_KEY: process.env.NOTION_API_KEY ? `set (starts with: ${process.env.NOTION_API_KEY.slice(0, 8)}...)` : "NOT SET",
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? `set (${process.env.NOTION_DATABASE_ID})` : "NOT SET",
  });
}
