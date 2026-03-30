function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Split long text into Notion rich_text blocks (2000 char limit each)
function richText(str) {
  const chunks = [];
  let remaining = (str || "").slice(0, 10000); // cap at 10k chars
  while (remaining.length > 0) {
    chunks.push({ text: { content: remaining.slice(0, 2000) } });
    remaining = remaining.slice(2000);
  }
  return chunks.length ? chunks : [{ text: { content: "" } }];
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    return res.status(500).json({ error: "Notion credentials not configured" });
  }

  const { title, author, authorRole, contentType, rawContent, topics, signal } = req.body;

  const today = new Date();

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        Title: { title: [{ text: { content: (title || "").slice(0, 255) } }] },
        Author: { rich_text: richText(author) },
        AuthorRole: { rich_text: richText(authorRole) },
        ContentType: { select: { name: contentType || "My Note" } },
        RawContent: { rich_text: richText(rawContent) },
        Topics: { multi_select: (topics || []).map((t) => ({ name: t })) },
        Signal: { rich_text: richText(signal) },
        DateAdded: { date: { start: today.toISOString().split("T")[0] } },
        WeekNumber: { number: getISOWeek(today) },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return res.status(response.status).json({ error: err.message || "Notion API error" });
  }

  const data = await response.json();
  return res.status(200).json({ id: data.id, title });
}
