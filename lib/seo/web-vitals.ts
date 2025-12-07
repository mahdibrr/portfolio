/**
 * Core Web Vitals Reporting Module
 * 
 * This module provides utilities for tracking and reporting Core Web Vitals metrics
 * to analytics services. It supports Google Analytics 4 and custom analytics endpoints.
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Loading performance
 * - CLS (Cumulative Layout Shift): Visual stability
 * - INP (Interaction to Next Paint): Responsiveness (replaces FID)
 * - FCP (First Contentful Paint): Initial render
 * - TTFB (Time to First Byte): Server response time
 * 
 * Requirements: 10.3
 */

import type { Metric } from 'web-vitals';

/**
 * Core Web Vitals target thresholds
 * Based on Google's recommended values for good user experience
 */
export const WEB_VITALS_TARGETS = {
  lcp: 2500,  // < 2.5s is good
  cls: 0.1,   // < 0.1 is good
  inp: 200,   // < 200ms is good
  fcp: 1800,  // < 1.8s is good
  ttfb: 800,  // < 800ms is good
} as const;

/**
 * Metric rating based on thresholds
 */
export type MetricRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Enhanced metric with rating
 */
export interface RatedMetric extends Metric {
  rating: MetricRating;
}

/**
 * Analytics event for web vitals
 */
export interface WebVitalsEvent {
  name: string;
  value: number;
  rating: MetricRating;
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Get rating for a metric based on its value and thresholds
 */
function getMetricRating(name: string, value: number): MetricRating {
  const thresholds = {
    LCP: [2500, 4000],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  } as const;

  const [good, poor] = thresholds[name as keyof typeof thresholds] || [0, Infinity];

  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Send metric to Google Analytics 4
 */
function sendToGoogleAnalytics(metric: RatedMetric): void {
  // Check if gtag is available
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const { name, value, rating, id, navigationType } = metric;

  // Send to GA4 as an event
  window.gtag('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: id,
    metric_value: value,
    metric_rating: rating,
    metric_delta: metric.delta,
    metric_navigation_type: navigationType,
    // Custom dimension for debugging
    debug_target: name === 'CLS' ? WEB_VITALS_TARGETS.cls : WEB_VITALS_TARGETS[name.toLowerCase() as keyof typeof WEB_VITALS_TARGETS],
  });
}

/**
 * Send metric to Vercel Analytics (if available)
 */
function sendToVercelAnalytics(metric: RatedMetric): void {
  if (typeof window === 'undefined' || !window.va) {
    return;
  }

  const { name, value, rating } = metric;

  // Vercel Analytics track method
  window.va('event', {
    name: `web-vital-${name.toLowerCase()}`,
    data: {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      rating,
    },
  });
}

/**
 * Send metric to custom analytics endpoint
 */
async function sendToCustomEndpoint(metric: RatedMetric): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  
  if (!endpoint) {
    return;
  }

  try {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    // Use sendBeacon if available (more reliable for page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      // Fallback to fetch
      fetch(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error);
    }
  } catch (error) {
    console.error('Failed to send web vitals to custom endpoint:', error);
  }
}

/**
 * Log metric to console in development
 */
function logMetricToConsole(metric: RatedMetric): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
  const target = WEB_VITALS_TARGETS[metric.name.toLowerCase() as keyof typeof WEB_VITALS_TARGETS];

  console.log(
    `${emoji} ${metric.name}:`,
    `${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'}`,
    `(${metric.rating})`,
    target ? `[target: ${target}${metric.name === 'CLS' ? '' : 'ms'}]` : ''
  );
}

/**
 * Main handler for web vitals metrics
 * This function should be called with each metric from web-vitals library
 */
export function reportWebVitals(metric: Metric): void {
  // Add rating to metric
  const ratedMetric: RatedMetric = {
    ...metric,
    rating: getMetricRating(metric.name, metric.value),
  };

  // Log in development
  logMetricToConsole(ratedMetric);

  // Send to analytics services
  sendToGoogleAnalytics(ratedMetric);
  sendToVercelAnalytics(ratedMetric);
  sendToCustomEndpoint(ratedMetric);
}

/**
 * Initialize web vitals reporting
 * Call this function once when your app loads
 */
export async function initWebVitalsReporting(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Dynamically import web-vitals to reduce initial bundle size
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');

    // Register handlers for each metric
    onCLS(reportWebVitals);
    onINP(reportWebVitals);
    onLCP(reportWebVitals);
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
  } catch (error) {
    console.error('Failed to initialize web vitals reporting:', error);
  }
}

/**
 * Get current web vitals snapshot
 * Useful for debugging or displaying metrics in UI
 */
export async function getWebVitalsSnapshot(): Promise<Record<string, number>> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');
    
    const metrics: Record<string, number> = {};

    // Get current values
    onCLS((metric) => { metrics.CLS = metric.value; }, { reportAllChanges: true });
    onINP((metric) => { metrics.INP = metric.value; }, { reportAllChanges: true });
    onLCP((metric) => { metrics.LCP = metric.value; }, { reportAllChanges: true });
    onFCP((metric) => { metrics.FCP = metric.value; }, { reportAllChanges: true });
    onTTFB((metric) => { metrics.TTFB = metric.value; }, { reportAllChanges: true });

    return metrics;
  } catch (error) {
    console.error('Failed to get web vitals snapshot:', error);
    return {};
  }
}

// Type augmentation for window object
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    va?: (
      command: string,
      params: Record<string, unknown>
    ) => void;
  }
}
