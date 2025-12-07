/**
 * Custom 404 Not Found Page
 * 
 * Requirements: 5.4
 */

import Link from 'next/link'
import { Home, Search, ArrowLeft, Mail, Github, Linkedin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Go Home Button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Popular Content Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/#about"
              className="text-blue-600 dark:text-blue-400 hover:underline text-left px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              About Me
            </Link>
            <Link
              href="/#projects"
              className="text-blue-600 dark:text-blue-400 hover:underline text-left px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#skills"
              className="text-blue-600 dark:text-blue-400 hover:underline text-left px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skills & Technologies
            </Link>
            <Link
              href="/#contact"
              className="text-blue-600 dark:text-blue-400 hover:underline text-left px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            Need help? Feel free to reach out:
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:mahdi.benrhouma@sesame.com.tn"
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email Mahdi Ben Rhouma"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a
              href="https://github.com/mahdibrr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          <p>
            Try searching for:{' '}
            <Link href="/#projects" className="text-blue-600 dark:text-blue-400 hover:underline">
              React projects
            </Link>
            ,{' '}
            <Link href="/#skills" className="text-blue-600 dark:text-blue-400 hover:underline">
              full-stack development
            </Link>
            , or{' '}
            <Link href="/#contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              hire a developer
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
