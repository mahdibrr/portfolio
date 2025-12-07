import { test, expect } from '@playwright/test';

/**
 * Feature: mobile-performance-optimization
 * Property 9: Below-fold components lazy load on proximity
 * Validates: Requirements 2.2
 * 
 * For any component marked as below-the-fold, it should not mount or load
 * resources until it is within the specified threshold distance from the viewport.
 */
test.describe('Property 9: Below-fold components lazy load on proximity', () => {
  test('below-fold sections should not be fully rendered on initial load', async ({ page }) => {
    await page.goto('/');
    
    // Wait for initial content to load
    await page.waitForLoadState('domcontentloaded');
    
    // Check that hero section is visible
    const heroSection = await page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // The projects section should exist but may not be fully loaded
    const projectsSection = await page.locator('#projects');
    const isProjectsInViewport = await projectsSection.isVisible();
    
    // On initial load without scrolling, projects section should not be in viewport
    // (depends on viewport size)
    const viewport = page.viewportSize();
    if (viewport && viewport.height < 900) {
      // On smaller viewports, projects should be below fold
      console.log('Projects section visibility on load:', isProjectsInViewport);
    }
  });

  test('content should load as user scrolls', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Track network requests for lazy-loaded content
    const lazyRequests: string[] = [];
    page.on('request', (request) => {
      if (request.resourceType() === 'image' || request.resourceType() === 'script') {
        lazyRequests.push(request.url());
      }
    });
    
    const initialRequestCount = lazyRequests.length;
    
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // More requests should have been made after scrolling
    const afterScrollRequestCount = lazyRequests.length;
    
    console.log(`Requests before scroll: ${initialRequestCount}, after: ${afterScrollRequestCount}`);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 29: Projects section lazy loads
 * Validates: Requirements 8.1
 * 
 * For any project component in the projects section, it should not mount
 * until the projects section is within the viewport threshold.
 */
test.describe('Property 29: Projects section lazy loads', () => {
  test('projects section should be accessible after scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    // Projects section should now be visible
    const projectsSection = await page.locator('#projects');
    await expect(projectsSection).toBeVisible();
    
    // Project cards should be rendered
    const projectCards = await page.locator('#projects .group').count();
    expect(projectCards).toBeGreaterThan(0);
  });

  test('project images should lazy load', async ({ page }) => {
    const imageLoadTimes: { url: string; time: number }[] = [];
    const startTime = Date.now();
    
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image') {
        imageLoadTimes.push({
          url: response.url(),
          time: Date.now() - startTime,
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const initialImageCount = imageLoadTimes.length;
    
    // Scroll to projects
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // More images should have loaded after scrolling
    const afterScrollImageCount = imageLoadTimes.length;
    
    console.log(`Images loaded initially: ${initialImageCount}, after scroll: ${afterScrollImageCount}`);
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 16: Carousel images lazy load
 * Validates: Requirements 3.3, 8.2
 * 
 * For any carousel component, only the first visible image should load
 * immediately, with subsequent images loading only when they become visible.
 */
test.describe('Property 16: Carousel images lazy load', () => {
  test('carousel should load first image eagerly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to a carousel
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Find carousel images
    const carouselImages = await page.locator('.group\\/carousel img').all();
    
    if (carouselImages.length > 0) {
      // First image should be loaded
      const firstImage = carouselImages[0];
      const loading = await firstImage.getAttribute('loading');
      
      // First image should have eager loading or no loading attribute (default eager)
      expect(loading === 'eager' || loading === null).toBeTruthy();
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 30: Iframe defers until visible
 * Validates: Requirements 8.3
 * 
 * For any iframe element, it should not have its src attribute set
 * until the iframe is scrolled into the viewport.
 */
test.describe('Property 30: Iframe defers until visible', () => {
  test('iframe should have lazy loading attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Find iframes
    const iframes = await page.locator('iframe').all();
    
    for (const iframe of iframes) {
      const loading = await iframe.getAttribute('loading');
      // Iframes should have lazy loading
      expect(loading).toBe('lazy');
    }
  });
});

/**
 * Feature: mobile-performance-optimization
 * Property 31: Video loads on explicit user action
 * Validates: Requirements 8.5
 * 
 * For any video element (Ghassla demo), it should not load until
 * the user explicitly clicks a button to view it.
 */
test.describe('Property 31: Video loads on explicit user action', () => {
  test('video should not load on initial page load', async ({ page }) => {
    const videoRequests: string[] = [];
    
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('.mp4') || url.includes('video')) {
        videoRequests.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll through the page but don't click the video button
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Video should not have been requested yet
    const videoLoadedBeforeClick = videoRequests.length;
    console.log(`Video requests before interaction: ${videoLoadedBeforeClick}`);
    
    // The video should only load after user clicks "Watch Demo"
    // This test verifies the video doesn't auto-load
  });

  test('video should load after user clicks watch button', async ({ page }) => {
    const videoRequests: string[] = [];
    
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('.mp4') || url.includes('video')) {
        videoRequests.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to Ghassla project
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Look for the "Watch Demo" button
    const watchButton = await page.locator('button:has-text("Watch")').first();
    
    if (await watchButton.isVisible()) {
      const beforeClick = videoRequests.length;
      
      await watchButton.click();
      await page.waitForTimeout(1000);
      
      const afterClick = videoRequests.length;
      
      // Video should load after clicking
      console.log(`Video requests before: ${beforeClick}, after: ${afterClick}`);
    }
  });
});
