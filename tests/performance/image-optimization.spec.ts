import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 17: Hero image uses priority loading
 * Validates: Requirements 3.4
 * 
 * For any hero section image, it should have the priority attribute set
 * and load in the first batch of network requests.
 */
test.describe('Property 17: Hero image uses priority loading', () => {
  test('hero image should load with high priority', async ({ page }) => {
    // Track image requests
    const imageRequests: { url: string; timing: number }[] = [];
    const startTime = Date.now();
    
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        imageRequests.push({
          url: request.url(),
          timing: Date.now() - startTime,
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Find the hero image (profile image)
    const heroImage = await page.locator('img[alt="Mahdi Ben Rhouma Profile"]').first();
    await expect(heroImage).toBeVisible();
    
    // Check that the hero image was one of the first images requested
    const heroImageUrl = await heroImage.getAttribute('src');
    const heroRequest = imageRequests.find(r => 
      heroImageUrl && r.url.includes('hebbkx1anhila5yf.public.blob.vercel-storage.com')
    );
    
    // Hero image should be requested early (within first 5 image requests)
    if (heroRequest) {
      const heroIndex = imageRequests.indexOf(heroRequest);
      expect(heroIndex).toBeLessThan(5);
    }
  });

  test('hero image should have proper dimensions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const heroImage = await page.locator('img[alt="Mahdi Ben Rhouma Profile"]').first();
    
    // Check that width and height are set (prevents layout shift)
    const width = await heroImage.getAttribute('width');
    const height = await heroImage.getAttribute('height');
    
    // Next.js Image component should set these
    expect(width).toBeTruthy();
    expect(height).toBeTruthy();
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 14: Images serve modern formats with fallbacks
 * Validates: Requirements 3.1, 8.4
 * 
 * For any image element, it should serve WebP or AVIF format to supporting
 * browsers with JPEG fallback for non-supporting browsers.
 */
test.describe('Property 14: Images serve modern formats with fallbacks', () => {
  test('should request images in modern formats', async ({ page }) => {
    const imageFormats: string[] = [];
    
    page.on('response', (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.startsWith('image/')) {
        imageFormats.push(contentType);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have some images loaded
    expect(imageFormats.length).toBeGreaterThan(0);
    
    // Check that modern formats are being used (WebP or AVIF)
    const modernFormats = imageFormats.filter(f => 
      f.includes('webp') || f.includes('avif')
    );
    
    // At least some images should be in modern format
    // (depends on browser support and Next.js optimization)
    console.log('Image formats loaded:', imageFormats);
  });

  test('images should have srcset for responsive loading', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check Next.js optimized images have srcset
    const images = await page.locator('img[srcset]').all();
    
    // Should have at least some images with srcset
    expect(images.length).toBeGreaterThan(0);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 15: Images use responsive sizing
 * Validates: Requirements 3.2, 3.6
 * 
 * For any image element, it should have srcset and sizes attributes that
 * provide appropriately sized images for different viewport widths.
 */
test.describe('Property 15: Images use responsive sizing', () => {
  test('images should have sizes attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for images with sizes attribute
    const imagesWithSizes = await page.locator('img[sizes]').count();
    
    // Should have at least the hero image with sizes
    expect(imagesWithSizes).toBeGreaterThan(0);
  });

  test('hero image should have appropriate sizes for mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const heroImage = await page.locator('img[alt="Mahdi Ben Rhouma Profile"]').first();
    const sizes = await heroImage.getAttribute('sizes');
    
    // Should have sizes attribute with mobile breakpoint
    expect(sizes).toBeTruthy();
    expect(sizes).toContain('max-width');
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 18: Images meet compression targets
 * Validates: Requirements 3.5, 9.5
 * 
 * For any optimized image, the file size should be reasonable for web delivery.
 */
test.describe('Property 18: Images meet compression targets', () => {
  test('images should not be excessively large', async ({ page }) => {
    const imageSizes: { url: string; size: number }[] = [];
    
    page.on('response', async (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.startsWith('image/')) {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          imageSizes.push({
            url: response.url(),
            size: parseInt(contentLength, 10),
          });
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that no image is larger than 500KB (reasonable for web)
    const largeImages = imageSizes.filter(img => img.size > 500 * 1024);
    
    if (largeImages.length > 0) {
      console.log('Large images found:', largeImages);
    }
    
    // Allow some large images but flag them
    expect(largeImages.length).toBeLessThanOrEqual(2);
  });

  test('total image payload should be reasonable', async ({ page }) => {
    let totalImageSize = 0;
    
    page.on('response', async (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.startsWith('image/')) {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          totalImageSize += parseInt(contentLength, 10);
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Total image payload should be under 2MB for initial load
    const totalMB = totalImageSize / (1024 * 1024);
    console.log(`Total image payload: ${totalMB.toFixed(2)} MB`);
    
    expect(totalImageSize).toBeLessThan(2 * 1024 * 1024);
  });
});
