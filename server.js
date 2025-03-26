
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/fetch-product", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const finalUrl = page.url();
    const html = await page.content();

    await browser.close();

    res.json({ finalUrl, html });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch product page" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Puppeteer Proxy running at http://localhost:${PORT}`);
});
