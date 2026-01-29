import { Injectable } from '@angular/core';

/**
 * FormatUtilsService provides utility functions for formatting dates, strings, and numbers
 * Used across the application for consistent data presentation
 */
@Injectable({
  providedIn: 'root',
})
export class FormatUtilsService {
  /**
   * Formats a date to a human-readable string
   * @param date - Date to format
   * @param format - Format type ('short' | 'medium' | 'long')
   * @returns Formatted date string
   */
  formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const options: Intl.DateTimeFormatOptions = this.getDateFormatOptions(format);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  /**
   * Capitalizes the first letter of a string
   * @param str - String to capitalize
   * @returns Capitalized string
   */
  capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Truncates a string to a specified length with ellipsis
   * @param str - String to truncate
   * @param maxLength - Maximum length before truncation
   * @returns Truncated string
   */
  truncate(str: string, maxLength: number): string {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  }

  /**
   * Formats a number with thousand separators
   * @param num - Number to format
   * @param decimals - Number of decimal places (default: 0)
   * @returns Formatted number string
   */
  formatNumber(num: number, decimals: number = 0): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }

  /**
   * Converts bytes to human-readable file size
   * @param bytes - Number of bytes
   * @returns Formatted file size string (e.g., "1.5 MB")
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * Gets relative time string (e.g., "2 hours ago", "in 3 days")
   * @param date - Date to compare with now
   * @returns Relative time string
   */
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (Math.abs(diffSec) < 60) {
      return 'just now';
    } else if (Math.abs(diffMin) < 60) {
      return diffMin > 0 ? `in ${diffMin} minutes` : `${Math.abs(diffMin)} minutes ago`;
    } else if (Math.abs(diffHour) < 24) {
      return diffHour > 0 ? `in ${diffHour} hours` : `${Math.abs(diffHour)} hours ago`;
    } else if (Math.abs(diffDay) < 7) {
      return diffDay > 0 ? `in ${diffDay} days` : `${Math.abs(diffDay)} days ago`;
    }

    return this.formatDate(date, 'short');
  }

  /**
   * Private helper to get date format options
   */
  private getDateFormatOptions(format: 'short' | 'medium' | 'long'): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'short':
        return { year: 'numeric', month: 'numeric', day: 'numeric' };
      case 'medium':
        return { year: 'numeric', month: 'short', day: 'numeric' };
      case 'long':
        return {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
      default:
        return { year: 'numeric', month: 'short', day: 'numeric' };
    }
  }
}
