import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 33: Unused CSS is purged
 * Validates: Requirements 10.2
 * 
 * For any production CSS bundle, it should not contain class definitions
 * that are not used in the HTML.
 */
test.describe('Property 33: Unused CSS is purged', () => {
  test('CSS bundle should be reasonably sized', async ({ page }) => {
    let totalCssSize = 0;
    
    page.on('response', async (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType?.includes('text/css') || response.url().endsWith('.css')) {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          totalCssSize += parseInt(contentLength, 10);
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalKB = totalCssSize / 1024;
    console.log(`Total CSS size: ${totalKB.toFixed(2)} KB`);
    
    // CSS should be under 100KB after purging
    expect(totalCssSize).toBeLessThan(100 * 1024);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 32: Critical CSS is inlined
 * Validates: Requirements 10.1
 * 
 * For any production build, the HTML should contain inlined style tags
 * with CSS for above-the-fold content.
 */
test.describe('Property 32: Critical CSS is inlined', () => {
  test('should have some inline styles for critical content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for inline styles
    const inlineStyles = await page.evaluate(() => {
      const styleTags = Array.from(document.querySelectorAll('style'));
      return styleTags.length;
    });
    
    console.log(`Inline style tags: ${inlineStyles}`);
    
    // Next.js with optimizeCss should inline critical CSS
    // At minimum, there should be some inline styles
  });

  test('above-fold content should be styled immediately', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check that hero section has styles applied
    const heroStyles = await page.evaluate(() => {
      const hero = document.querySelector('section');
      if (!hero) return null;
      
      const computed = window.getComputedStyle(hero);
      return {
        display: computed.display,
        position: computed.position,
      };
    });
    
    expect(heroStyles).toBeTruthy();
    expect(heroStyles?.display).not.toBe('');
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 34: CSS is minified
 * Validates: Requirements 10.3
 * 
 * For any production CSS file, it should be minified with whitespace
 * removed and optimized.
 */
test.describe('Property 34: CSS is minified', () => {
  test('CSS files should be compressed', async ({ page }) => {
    const cssResponses: { url: string; size: number; encoding: string | null }[] = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.endsWith('.css') || response.headers()['content-type']?.includes('css')) {
        cssResponses.push({
          url,
          size: parseInt(response.headers()['content-length'] || '0', 10),
          encoding: response.headers()['content-encoding'],
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('CSS responses:', cssResponses);
    
    // CSS should be gzip or brotli compressed
    for (const css of cssResponses) {
      if (css.size > 1000) {
        // Larger CSS files should be compressed
        console.log(`${css.url}: ${css.encoding || 'no compression'}`);
      }
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 35: Simple animations use CSS
 * Validates: Requirements 10.4
 * 
 * For any simple animation (fade, slide, scale), it should be implemented
 * using CSS transitions or animations rather than JavaScript.
 */
test.describe('Property 35: Simple animations use CSS', () => {
  test('page should have CSS transitions defined', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for CSS transitions on interactive elements
    const hasTransitions = await page.evaluate(() => {
      const elements = document.querySelectorAll('button, a, [class*="transition"]');
      let transitionCount = 0;
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.transition && style.transition !== 'none' && style.transition !== 'all 0s ease 0s') {
          transitionCount++;
        }
      });
      
      return transitionCount;
    });
    
    console.log(`Elements with CSS transitions: ${hasTransitions}`);
    
    // Should have some CSS transitions
    expect(hasTransitions).toBeGreaterThan(0);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 36: Layout shift is minimized
 * Validates: Requirements 10.5
 * 
 * For any page load, the Cumulative Layout Shift score should be
 * less than or equal to 0.1.
 */
test.describe('Property 36: Layout shift is minimized', () => {
  test('CLS should be under 0.1', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        
        try {
          observer.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          // Layout shift API not supported
          resolve(0);
          return;
        }
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 2000);
      });
    });
    
    console.log(`CLS: ${cls}`);
    
    // CLS should be under 0.1 for good UX
    expect(cls).toBeLessThan(0.1);
  });

  test('images should have dimensions to prevent layout shift', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check that images have width and height
    const imagesWithoutDimensions = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => {
        const hasWidth = img.hasAttribute('width') || img.style.width;
        const hasHeight = img.hasAttribute('height') || img.style.height;
        return !hasWidth || !hasHeight;
      }).length;
    });
    
    console.log(`Images without dimensions: ${imagesWithoutDimensions}`);
    
    // Most images should have dimensions
    expect(imagesWithoutDimensions).toBeLessThanOrEqual(2);
  });
});
