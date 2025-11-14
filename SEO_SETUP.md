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

### Step 1: Update Your Domain
Replace `https://yourportfolio.com` in these files:
1. **`/app/sitemap.ts`** (line 4)
2. **`/app/robots.ts`** (line 4)
3. **`/app/layout.tsx`** (line 19)
4. **`/app/page.tsx`** (line 172)

### Step 2: Create Open Graph Image
1. Create a 1200x630px image showcasing your portfolio
2. Save it as `/public/og-image.png`
3. This will be used when sharing your site on social media

Suggested content:
- Your name and title
- Key technologies (React, Next.js, FastAPI, etc.)
- Professional photo or branding
- Gradient background matching your site theme

### Step 3: Set Up Google Search Console

1. **Go to**: https://search.google.com/search-console

2. **Add Your Property**:
   - Click "Add Property"
   - Choose "URL prefix"
   - Enter your domain

3. **Verify Ownership** (Choose one method):

   **Option A: HTML Tag** (Recommended)
   - Copy the verification code from Google
   - Update `/app/layout.tsx` line 88:
     ```typescript
     verification: {
       google: "your-actual-verification-code-here",
     },
     ```

   **Option B: HTML File Upload**
   - Download the verification file from Google
   - Place it in `/public/` folder

4. **Submit Your Sitemap**:
   - After verification, go to "Sitemaps" in the left menu
   - Enter: `https://yourdomain.com/sitemap.xml`
   - Click "Submit"

### Step 4: Monitor and Optimize

After 2-3 days, check Google Search Console for:
- **Coverage**: Ensure all pages are indexed
- **Performance**: Track clicks, impressions, CTR
- **Mobile Usability**: Check for mobile issues
- **Core Web Vitals**: Monitor performance metrics

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

- [ ] Update all domain URLs from placeholder
- [ ] Create and add og-image.png (1200x630)
- [ ] Add Google verification code
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools (optional)
- [ ] Test Open Graph tags: https://www.opengraph.xyz/
- [ ] Test Twitter Cards: https://cards-dev.twitter.com/validator
- [ ] Test Schema markup: https://validator.schema.org/
- [ ] Check mobile responsiveness: https://search.google.com/test/mobile-friendly
- [ ] Test Core Web Vitals: https://pagespeed.web.dev/

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
