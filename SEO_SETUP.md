# SEO and Google Search Console Setup Guide

## ✅ What's Already Configured

### 1. **Sitemap** (`/app/sitemap.ts`)
- Auto-generated XML sitemap at `/sitemap.xml`
- Includes all main sections: Home, About, Projects, Skills, Contact
- Updates automatically with change frequency and priority settings

### 2. **Robots.txt** (`/app/robots.ts`)
- Auto-generated at `/robots.txt`
- Allows all search engines to crawl
- References sitemap location

### 3. **Metadata & SEO Tags** (`/app/layout.tsx`)
- Complete meta tags with keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- Author and creator information
- Robots directives for search engines

### 4. **Structured Data** (`/app/page.tsx`)
- JSON-LD schema for Person
- Professional profile information
- Skills and education data
- Social media links

## 🔧 Required Actions

### Step 1: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code

# Bing Webmaster Tools Verification
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**For Production Deployment:**
- Add these same environment variables to your hosting platform (Vercel, Netlify, etc.)
- In Vercel: Settings → Environment Variables
- In Netlify: Site settings → Build & deploy → Environment

**Security Note:**
- These verification codes are safe to expose publicly (they're in the HTML anyway)
- The `NEXT_PUBLIC_` prefix makes them available in the browser

### Step 2: Update Your Domain
Replace `https://yourportfolio.com` in these files:
1. **`/app/sitemap.ts`** (line 4)
2. **`/app/robots.ts`** (line 4)
3. **`/app/layout.tsx`** (line 19)
4. **`/app/page.tsx`** (line 172)

### Step 3: Create Open Graph Image
1. Create a 1200x630px image showcasing your portfolio
2. Save it as `/public/og-image.png`
3. This will be used when sharing your site on social media

Suggested content:
- Your name and title
- Key technologies (React, Next.js, FastAPI, etc.)
- Professional photo or branding
- Gradient background matching your site theme

### Step 4: Set Up Google Search Console

1. **Go to**: https://search.google.com/search-console

2. **Add Your Property**:
   - Click "Add Property"
   - Choose "URL prefix"
   - Enter your domain (e.g., `https://mahdibr.online`)

3. **Verify Ownership** (Choose one method):

   **Option A: HTML Meta Tag** (Recommended - Already Configured)
   - In Google Search Console, select "HTML tag" verification method
   - Copy the verification code (the content value from the meta tag)
   - Add it to your `.env.local` file:
     ```bash
     NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code-here
     ```
   - For production, add this environment variable to your hosting platform (Vercel, Netlify, etc.)
   - The meta tag is automatically included in the `<head>` section via `app/layout.tsx`
   - Click "Verify" in Google Search Console

   **Option B: HTML File Upload**
   - Download the verification file from Google
   - Place it in `/public/` folder
   - Deploy your site
   - Click "Verify" in Google Search Console

   **Option C: DNS Verification**
   - Copy the TXT record provided by Google
   - Add it to your domain's DNS settings
   - Wait for DNS propagation (can take up to 48 hours)
   - Click "Verify" in Google Search Console

4. **Submit Your Sitemap**:
   - After verification, go to "Sitemaps" in the left menu
   - Enter: `https://yourdomain.com/sitemap.xml`
   - Click "Submit"
   - Google will start crawling and indexing your pages

5. **Configure Settings** (Recommended):
   - **URL Parameters**: No action needed (Next.js handles this)
   - **International Targeting**: Set target country if applicable (Tunisia, France, etc.)
   - **Change of Address**: Only if migrating from another domain
   - **Users and Permissions**: Add team members if needed

6. **Enable Email Notifications**:
   - Go to Settings → Users and permissions
   - Ensure email notifications are enabled for:
     - Critical site issues
     - Manual actions
     - Security issues

### Step 5: Set Up Bing Webmaster Tools

1. **Go to**: https://www.bing.com/webmasters

2. **Add Your Site**:
   - Sign in with Microsoft account
   - Click "Add a site"
   - Enter your site URL

3. **Import from Google Search Console** (Easiest):
   - Choose "Import from Google Search Console"
   - Authorize Bing to access your GSC data
   - This automatically imports your sitemap and settings

   **OR Manual Verification**:
   - Select "HTML Meta Tag" verification method
   - Copy the verification code
   - Add it to your `.env.local` file:
     ```bash
     NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code-here
     ```
   - For production, add this environment variable to your hosting platform
   - The meta tag is automatically included via `app/layout.tsx`
   - Click "Verify"

4. **Submit Your Sitemap** (if not imported):
   - Go to "Sitemaps" section
   - Enter: `https://yourdomain.com/sitemap.xml`
   - Click "Submit"

5. **Configure Settings**:
   - **Crawl Control**: Set crawl rate (default is usually fine)
   - **Geo-targeting**: Set target regions if applicable
   - **URL Parameters**: No action needed

### Step 6: Monitor and Optimize

After 2-3 days, check Google Search Console for:
- **Coverage**: Ensure all pages are indexed
- **Performance**: Track clicks, impressions, CTR
- **Mobile Usability**: Check for mobile issues
- **Core Web Vitals**: Monitor performance metrics

Check Bing Webmaster Tools for:
- **Site Scan**: Review SEO recommendations
- **SEO Reports**: Check for issues and opportunities
- **Crawl Information**: Monitor crawl stats
- **Search Performance**: Track Bing-specific metrics

## 📊 Additional SEO Improvements

### Analytics
The site already includes Vercel Analytics. Consider adding:
- Google Analytics 4
- Plausible Analytics (privacy-friendly alternative)

### Performance
- ✅ Images are optimized (JPEG with 90% quality)
- ✅ Using Next.js Image component where applicable
- Consider adding lazy loading for images below the fold

### Accessibility
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Proper heading hierarchy
- ✅ ARIA labels on interactive elements

## 🎯 SEO Checklist

### Initial Setup
- [ ] Update all domain URLs from placeholder
- [ ] Create and add og-image.png (1200x630)
- [ ] Add environment variables to `.env.local`:
  - [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION`
  - [ ] `NEXT_PUBLIC_BING_VERIFICATION`
  - [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (for Google Analytics)

### Search Console Setup
- [ ] Set up Google Search Console account
- [ ] Add and verify your property in GSC
- [ ] Submit sitemap to Google Search Console
- [ ] Configure international targeting in GSC
- [ ] Enable email notifications in GSC
- [ ] Set up Bing Webmaster Tools
- [ ] Verify ownership in Bing Webmaster Tools
- [ ] Submit sitemap to Bing (or import from GSC)

### Testing & Validation
- [ ] Test Open Graph tags: https://www.opengraph.xyz/
- [ ] Test Twitter Cards: https://cards-dev.twitter.com/validator
- [ ] Test Schema markup: https://validator.schema.org/
- [ ] Check mobile responsiveness: https://search.google.com/test/mobile-friendly
- [ ] Test Core Web Vitals: https://pagespeed.web.dev/
- [ ] Verify sitemap accessibility: `https://yourdomain.com/sitemap.xml`
- [ ] Verify robots.txt: `https://yourdomain.com/robots.txt`

### Analytics & Monitoring
- [ ] Set up Google Analytics 4 (optional)
- [ ] Configure conversion tracking
- [ ] Set up Core Web Vitals monitoring
- [ ] Monitor search performance weekly

## 📝 Notes

- Your portfolio is set up for both English and French (`locale: "en_US"`, `alternateLocale: ["fr_FR"]`)
- All meta tags are optimized for full-stack developer keywords
- Sitemap updates automatically - no manual maintenance needed
- Robots.txt allows all crawlers and references your sitemap

## 🔗 Useful Links

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Schema.org: https://schema.org/
- Open Graph Debugger: https://www.opengraph.xyz/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
