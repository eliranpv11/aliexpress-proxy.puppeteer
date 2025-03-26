
# AliExpress Puppeteer Proxy

This is a Node.js-based proxy server that uses Puppeteer (a headless browser) to follow affiliate links like those from AliExpress, even when they use JavaScript redirects.

## ✨ Features

- Follows redirects (even JavaScript-based) like a real browser
- Returns final URL and full HTML content
- Perfect for scraping product pages behind affiliate links

## 🚀 How to Deploy on Render

1. Push these files to a GitHub repository
2. Go to https://render.com
3. Create a new Web Service
4. Connect to your GitHub repo
5. Set these Render settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
   - **Instance Type:** Starter or above (must support Puppeteer)
6. Done! Use:
   ```
   https://your-app-name.onrender.com/fetch-product?url=https://s.click.aliexpress.com/e/_DkoCjZd
   ```

## ✅ Example

Try visiting:

```
/fetch-product?url=https://s.click.aliexpress.com/e/_DkoCjZd
```

And you'll get the final redirected page and full HTML.

---

Built by Eliran 🚀
