'use client';

/**
 * Web Vitals Reporter Component
 * 
 * This component initializes Core Web Vitals reporting when the app loads.
 * It should be included once in the root layout.
 * 
 * Requirements: 10.3
 */

import { useEffect } from 'react';
import { initWebVitalsReporting } from '@/lib/seo/web-vitals';

export function WebVitalsReporter() {
  useEffect(() => {
    // Initialize web vitals reporting on mount
    initWebVitalsReporting();
  }, []);

  // This component doesn't render anything
  return null;
}
