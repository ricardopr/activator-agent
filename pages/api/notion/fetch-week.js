function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getRichText(prop) {
  return prop?.rich_text?.map((b) => b.plain_text).join("") || "";
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    return res.status(500).json({ error: "Notion credentials not configured" });
  }

  const currentWeek = getISOWeek(new Date());

  const response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      filter: {
        property: "WeekNumber",
        number: { equals: currentWeek },
      },
      sorts: [{ property: "DateAdded", direction: "ascending" }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return res.status(response.status).json({ error: err.message || "Notion API error" });
  }

  const data = await response.json();

  const entries = data.results.map((page) => {
    const p = page.properties;
    return {
      title: p.Title?.title?.map((b) => b.plain_text).join("") || "",
      author: getRichText(p.Author),
      authorRole: getRichText(p.AuthorRole),
      contentType: p.ContentType?.select?.name || "",
      rawContent: getRichText(p.RawContent),
      topics: p.Topics?.multi_select?.map((t) => t.name) || [],
      signal: getRichText(p.Signal),
      dateAdded: p.DateAdded?.date?.start || "",
    };
  });

  return res.status(200).json({ entries, weekNumber: currentWeek });
}
