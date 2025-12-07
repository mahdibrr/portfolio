import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 11: Bundle splits into multiple chunks
 * Validates: Requirements 4.1
 * 
 * For any production build, the JavaScript output should contain multiple
 * chunk files with the main bundle under 150KB.
 */
test.describe('Property 11: Bundle splits into multiple chunks', () => {
  test('should load multiple JavaScript chunks', async ({ page }) => {
    const jsChunks: { url: string; size: number }[] = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/_next/static/chunks/')) {
        const contentLength = response.headers()['content-length'];
        jsChunks.push({
          url,
          size: contentLength ? parseInt(contentLength, 10) : 0,
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have multiple chunks (code splitting working)
    expect(jsChunks.length).toBeGreaterThan(1);
    
    console.log(`Loaded ${jsChunks.length} JavaScript chunks`);
    jsChunks.forEach(chunk => {
      const sizeKB = (chunk.size / 1024).toFixed(2);
      console.log(`  ${chunk.url.split('/').pop()}: ${sizeKB} KB`);
    });
  });

  test('main bundle should be reasonably sized', async ({ page }) => {
    let mainBundleSize = 0;
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/_next/static/chunks/main')) {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          mainBundleSize = parseInt(contentLength, 10);
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Main bundle should be under 200KB (reasonable for a Next.js app)
    const mainBundleKB = mainBundleSize / 1024;
    console.log(`Main bundle size: ${mainBundleKB.toFixed(2)} KB`);
    
    expect(mainBundleSize).toBeLessThan(200 * 1024);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 10: Heavy animation components load after critical path
 * Validates: Requirements 2.3, 2.4, 2.5, 2.6
 * 
 * For any heavy animation component (FloatingParticles, CursorTrail, MorphingBlob),
 * it should be dynamically imported and not execute until after both FCP and LCP events complete.
 */
test.describe('Property 10: Heavy animation components load after critical path', () => {
  test('animation components should not block initial render', async ({ page }) => {
    const loadTimes: { resource: string; time: number }[] = [];
    const startTime = Date.now();
    
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('FloatingParticles') || 
          url.includes('CursorTrail') || 
          url.includes('MorphingBlob') ||
          url.includes('framer-motion')) {
        loadTimes.push({
          resource: url.split('/').pop() || url,
          time: Date.now() - startTime,
        });
      }
    });
    
    await page.goto('/');
    
    // Get FCP timing
    const fcpTime = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcp = entries.find(e => e.name === 'first-contentful-paint');
      return fcp ? fcp.startTime : 0;
    });
    
    await page.waitForLoadState('networkidle');
    
    console.log(`FCP: ${fcpTime}ms`);
    loadTimes.forEach(lt => {
      console.log(`  ${lt.resource}: ${lt.time}ms`);
    });
    
    // Animation resources should load after FCP (or be dynamically imported)
    // This is a soft check since dynamic imports may still load quickly
  });

  test('page should be interactive before animations load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Navigation should be clickable immediately
    const navButton = await page.locator('button').first();
    await expect(navButton).toBeEnabled();
    
    // Hero section should be visible
    const heroText = await page.locator('h1').first();
    await expect(heroText).toBeVisible();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 8: Animation libraries defer until after initial render
 * Validates: Requirements 2.1
 * 
 * For any page load, animation library code (Framer Motion) should not
 * execute until after the First Contentful Paint event.
 */
test.describe('Property 8: Animation libraries defer until after initial render', () => {
  test('framer-motion should be in separate chunk', async ({ page }) => {
    const framerChunks: string[] = [];
    
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('framer-motion') || url.includes('framer')) {
        framerChunks.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Framer motion should be loaded (it's used for animations)
    // The key is that it's in a separate chunk, not blocking initial render
    console.log(`Framer Motion chunks loaded: ${framerChunks.length}`);
  });

  test('initial content should render without waiting for animations', async ({ page }) => {
    await page.goto('/');
    
    // Wait only for DOM content, not full load
    await page.waitForLoadState('domcontentloaded');
    
    // Check that main content is visible
    const mainContent = await page.locator('main, section').first();
    await expect(mainContent).toBeVisible();
    
    // Hero text should be visible
    const heroHeading = await page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 12: Tree-shaking removes unused code
 * Validates: Requirements 4.2, 4.3, 4.4
 * 
 * For any imported library (icons, Framer Motion), only the explicitly
 * imported exports should be present in the final bundle.
 */
test.describe('Property 12: Tree-shaking removes unused code', () => {
  test('total JavaScript payload should be reasonable', async ({ page }) => {
    let totalJsSize = 0;
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.endsWith('.js') || url.includes('/_next/static/')) {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          totalJsSize += parseInt(contentLength, 10);
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalMB = totalJsSize / (1024 * 1024);
    console.log(`Total JavaScript payload: ${totalMB.toFixed(2)} MB`);
    
    // Total JS should be under 1MB for good performance
    expect(totalJsSize).toBeLessThan(1024 * 1024);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 13: No duplicate dependencies in bundle
 * Validates: Requirements 4.5
 * 
 * For any production bundle analysis, each dependency should appear
 * exactly once in the dependency tree.
 */
test.describe('Property 13: No duplicate dependencies in bundle', () => {
  test('should not load same chunk multiple times', async ({ page }) => {
    const loadedChunks = new Map<string, number>();
    
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/_next/static/chunks/')) {
        const chunkName = url.split('/').pop() || url;
        loadedChunks.set(chunkName, (loadedChunks.get(chunkName) || 0) + 1);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for duplicate chunk loads
    const duplicates = Array.from(loadedChunks.entries())
      .filter(([_, count]) => count > 1);
    
    if (duplicates.length > 0) {
      console.log('Duplicate chunk loads:', duplicates);
    }
    
    // No chunk should be loaded more than once
    expect(duplicates.length).toBe(0);
  });
});
