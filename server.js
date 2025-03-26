const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from any origin (or specify extension origin for stricter control)
app.use(cors({
  origin: '*'
}));

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

    // Extract product details
    const productDetails = await page.evaluate(() => {
      const productName = document.querySelector('h1.product-title-text') ? document.querySelector('h1.product-title-text').innerText : "שם מוצר לא נמצא";
      const price = document.querySelector('.product-price-value') ? document.querySelector('.product-price-value').innerText : "מחיר לא זמין";
      const rating = document.querySelector('.overview-rating-average') ? document.querySelector('.overview-rating-average').innerText : "לא זמין";
      const sales = document.querySelector('.product-reviewer-sold') ? document.querySelector('.product-reviewer-sold').innerText : "לא ידוע";
      const discount = document.querySelector('.product-discount') ? document.querySelector('.product-discount').innerText : "לא זמין";
      const finalUrl = window.location.href;

      return {
        productName,
        price,
        rating,
        sales,
        discount,
        finalUrl
      };
    });

    await browser.close();

    // Return structured JSON with product data
    res.json(productDetails);

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch product page" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Puppeteer Proxy running at http://localhost:${PORT}`);
});
