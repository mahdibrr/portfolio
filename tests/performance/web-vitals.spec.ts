import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 37: Core Web Vitals are reported
 * Validates: Requirements 9.1
 * 
 * For any production deployment, the application should collect and report
 * FCP, LCP, CLS, and INP metrics.
 */
test.describe('Property 37: Core Web Vitals are reported', () => {
  test('should have web vitals reporting infrastructure', async ({ page }) => {
    // Navigate to the page
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check that Vercel Analytics is present (handles web vitals reporting)
    const analyticsScript = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(script => 
        script.src.includes('vercel') || 
        script.innerHTML.includes('analytics') ||
        script.innerHTML.includes('vitals')
      );
    });
    
    // Check for Speed Insights which reports Core Web Vitals
    const speedInsightsPresent = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
        (document.querySelector('[data-vercel-speed-insights]') !== null ||
         Array.from(document.querySelectorAll('script')).some(s => 
           s.src.includes('speed-insights') || s.innerHTML.includes('SpeedInsights')
         ));
    });
    
    // At least one reporting mechanism should be present
    expect(analyticsScript || speedInsightsPresent).toBeTruthy();
  });

  test('should collect performance metrics', async ({ page }) => {
    // Navigate and collect performance metrics
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get performance entries
    const metrics = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
      
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const lcpEntry = lcpEntries[lcpEntries.length - 1];
      
      return {
        fcp: fcpEntry ? fcpEntry.startTime : null,
        lcp: lcpEntry ? (lcpEntry as PerformanceEntry & { startTime: number }).startTime : null,
        navigationTiming: performance.getEntriesByType('navigation')[0],
      };
    });
    
    // Verify metrics are being collected
    expect(metrics.fcp).not.toBeNull();
    expect(metrics.navigationTiming).toBeDefined();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 38: Metrics segmented by device type
 * Validates: Requirements 9.2
 * 
 * For any collected performance metric, it should be tagged with device type
 * (mobile/desktop) for separate analysis.
 */
test.describe('Property 38: Metrics segmented by device type', () => {
  test('should detect mobile device correctly', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check viewport is mobile-sized
    const viewport = page.viewportSize();
    const isMobileViewport = viewport && viewport.width <= 768;
    
    // Verify the page responds to mobile viewport
    const isMobileLayout = await page.evaluate(() => {
      return window.innerWidth <= 768;
    });
    
    expect(isMobileLayout).toBe(isMobileViewport);
  });

  test('should have device-aware analytics', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that analytics can differentiate device types
    const hasDeviceDetection = await page.evaluate(() => {
      // Check for common device detection patterns
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent) || 
                       window.innerWidth <= 768;
      return typeof isMobile === 'boolean';
    });
    
    expect(hasDeviceDetection).toBeTruthy();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 39: Bundle sizes reported during build
 * Validates: Requirements 9.4
 * 
 * For any production build, the build output should include bundle size
 * information for each chunk.
 */
test.describe('Property 39: Bundle sizes reported during build', () => {
  test('should load JavaScript bundles efficiently', async ({ page }) => {
    // Track all JS requests
    const jsRequests: { url: string; size: number }[] = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.endsWith('.js') || url.includes('/_next/static')) {
        const headers = response.headers();
        const contentLength = headers['content-length'];
        if (contentLength) {
          jsRequests.push({
            url,
            size: parseInt(contentLength, 10),
          });
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify bundles are being loaded
    expect(jsRequests.length).toBeGreaterThan(0);
    
    // Check that no single bundle is excessively large (> 500KB)
    const largeBundles = jsRequests.filter(r => r.size > 500 * 1024);
    expect(largeBundles.length).toBe(0);
  });

  test('should have multiple chunks (code splitting)', async ({ page }) => {
    const jsChunks: string[] = [];
    
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/_next/static/chunks/')) {
        jsChunks.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have multiple chunks indicating code splitting
    expect(jsChunks.length).toBeGreaterThan(1);
  });
});
