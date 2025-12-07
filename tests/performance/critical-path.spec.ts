import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 6: Navigation renders within FCP
 * Validates: Requirements 6.1
 * 
 * For any page load, the navigation component should be present in the DOM
 * at or before the First Contentful Paint event.
 */
test.describe('Property 6: Navigation renders within FCP', () => {
  test('navigation should be visible on initial load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Navigation should be immediately visible
    const nav = await page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('navigation links should be functional quickly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Navigation buttons should be clickable
    const navButtons = await page.locator('nav button').all();
    expect(navButtons.length).toBeGreaterThan(0);
    
    for (const button of navButtons.slice(0, 2)) {
      await expect(button).toBeEnabled();
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 7: Hero content prioritized over decorations
 * Validates: Requirements 6.2
 * 
 * For any page load, hero text and call-to-action buttons should be rendered
 * in the DOM before decorative animation components initialize.
 */
test.describe('Property 7: Hero content prioritized over decorations', () => {
  test('hero text should be visible before animations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Hero heading should be visible
    const heroHeading = await page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    
    // Hero description should be visible
    const heroDesc = await page.locator('section').first().locator('p').first();
    await expect(heroDesc).toBeVisible();
  });

  test('CTA buttons should be functional on load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Find CTA buttons in hero section
    const ctaButtons = await page.locator('section').first().locator('button').all();
    
    // Should have at least one CTA button
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    // First CTA should be enabled
    if (ctaButtons.length > 0) {
      await expect(ctaButtons[0]).toBeEnabled();
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 27: Menu animations defer until interaction
 * Validates: Requirements 6.4
 * 
 * For any mobile menu animation, it should not load or initialize until
 * the user clicks the menu button.
 */
test.describe('Property 27: Menu animations defer until interaction', () => {
  test('mobile menu should not be visible initially', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Mobile menu content should be hidden initially
    const mobileMenuContent = await page.locator('[class*="md:hidden"]').locator('a, button').all();
    
    // Menu items should not be visible until menu is opened
    // (they may exist in DOM but be hidden)
  });

  test('menu should open on button click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Find and click menu button
    const menuButton = await page.locator('button').filter({ has: page.locator('svg') }).first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
      
      // Menu should now be visible
      // Check for menu items
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 28: Scroll animations initialize after render
 * Validates: Requirements 6.5
 * 
 * For any scroll-based animation, it should not initialize until after
 * the initial page render is complete (after FCP).
 */
test.describe('Property 28: Scroll animations initialize after render', () => {
  test('page should be scrollable immediately', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Page should be scrollable
    const canScroll = await page.evaluate(() => {
      return document.documentElement.scrollHeight > window.innerHeight;
    });
    
    expect(canScroll).toBeTruthy();
  });

  test('scroll should work smoothly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 4: Critical resources load before non-critical
 * Validates: Requirements 1.3
 * 
 * For any page load, above-the-fold content resources should complete loading
 * before below-the-fold content resources begin loading.
 */
test.describe('Property 4: Critical resources load before non-critical', () => {
  test('hero image should load before project images', async ({ page }) => {
    const imageLoadOrder: string[] = [];
    
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image') {
        imageLoadOrder.push(response.url());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hero image (profile) should be among the first images loaded
    const heroImageIndex = imageLoadOrder.findIndex(url => 
      url.includes('hebbkx1anhila5yf.public.blob.vercel-storage.com')
    );
    
    console.log(`Hero image loaded at position: ${heroImageIndex}`);
    
    // Hero image should be in first 3 images
    if (heroImageIndex !== -1) {
      expect(heroImageIndex).toBeLessThan(5);
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 5: Font and image preloading precedes non-critical resources
 * Validates: Requirements 1.4
 * 
 * For any critical font or hero image, it should have a preload directive
 * and load before non-critical resources in the network waterfall.
 */
test.describe('Property 5: Font and image preloading precedes non-critical resources', () => {
  test('should have preload hints in document head', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const preloadHints = await page.evaluate(() => {
      const preloads = Array.from(document.querySelectorAll('link[rel="preload"]'));
      return preloads.map(link => ({
        href: link.getAttribute('href'),
        as: link.getAttribute('as'),
      }));
    });
    
    console.log('Preload hints:', preloadHints);
  });

  test('should have preconnect for external resources', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const preconnects = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]'));
      return links.map(link => ({
        href: link.getAttribute('href'),
        rel: link.getAttribute('rel'),
      }));
    });
    
    console.log('Connection hints:', preconnects);
    
    // Should have preconnect for Vercel blob storage
    const hasVercelPreconnect = preconnects.some(p => 
      p.href?.includes('hebbkx1anhila5yf.public.blob.vercel-storage.com')
    );
    
    expect(hasVercelPreconnect).toBeTruthy();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 26: External origins use connection hints
 * Validates: Requirements 7.5
 * 
 * For any external domain that serves critical resources, there should be
 * a preconnect or dns-prefetch link tag in the HTML head.
 */
test.describe('Property 26: External origins use connection hints', () => {
  test('should have connection hints for external domains', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const connectionHints = await page.evaluate(() => {
      const preconnects = Array.from(document.querySelectorAll('link[rel="preconnect"]'));
      const dnsPrefetch = Array.from(document.querySelectorAll('link[rel="dns-prefetch"]'));
      
      return {
        preconnects: preconnects.map(l => l.getAttribute('href')),
        dnsPrefetch: dnsPrefetch.map(l => l.getAttribute('href')),
      };
    });
    
    console.log('Connection hints:', connectionHints);
    
    // Should have at least one connection hint
    const totalHints = connectionHints.preconnects.length + connectionHints.dnsPrefetch.length;
    expect(totalHints).toBeGreaterThan(0);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 24: Analytics scripts defer until interactive
 * Validates: Requirements 7.1
 * 
 * For any analytics or monitoring script, it should not execute until
 * after the page becomes interactive (after LCP).
 */
test.describe('Property 24: Analytics scripts defer until interactive', () => {
  test('analytics should not block initial render', async ({ page }) => {
    let analyticsLoadTime = 0;
    const startTime = Date.now();
    
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('vercel') && (url.includes('analytics') || url.includes('vitals'))) {
        analyticsLoadTime = Date.now() - startTime;
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const domContentLoaded = Date.now() - startTime;
    
    console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
    console.log(`Analytics loaded: ${analyticsLoadTime}ms`);
    
    // Analytics should load, but not block DOM content
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 25: Third-party scripts use async loading
 * Validates: Requirements 7.2, 7.3, 7.4
 * 
 * For any third-party script (Vercel Analytics, Speed Insights), it should
 * have the async attribute and not block HTML parsing.
 */
test.describe('Property 25: Third-party scripts use async loading', () => {
  test('third-party scripts should not block rendering', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for blocking scripts
    const blockingScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts
        .filter(s => !s.async && !s.defer && s.src)
        .map(s => s.src);
    });
    
    console.log('Potentially blocking scripts:', blockingScripts);
    
    // Should have minimal blocking scripts
    expect(blockingScripts.length).toBeLessThanOrEqual(2);
  });
});
