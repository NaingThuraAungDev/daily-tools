import { TestBed } from '@angular/core/testing';
import { FormatUtilsService } from './format-utils.service';

describe('FormatUtilsService', () => {
  let service: FormatUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatUtilsService],
    });
    service = TestBed.inject(FormatUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format date with medium format by default', () => {
      const date = new Date('2026-01-15T10:30:00');
      const result = service.formatDate(date);
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2026');
    });

    it('should format date with short format', () => {
      const date = new Date('2026-01-15T10:30:00');
      const result = service.formatDate(date, 'short');
      expect(result).toContain('1');
      expect(result).toContain('15');
      expect(result).toContain('2026');
    });

    it('should format date with long format including time', () => {
      const date = new Date('2026-01-15T10:30:00');
      const result = service.formatDate(date, 'long');
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2026');
      expect(result).toContain('10');
      expect(result).toContain('30');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize the first letter of a lowercase string', () => {
      expect(service.capitalizeFirst('hello')).toBe('Hello');
    });

    it('should handle already capitalized strings', () => {
      expect(service.capitalizeFirst('HELLO')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(service.capitalizeFirst('')).toBe('');
    });

    it('should handle single character', () => {
      expect(service.capitalizeFirst('a')).toBe('A');
    });

    it('should handle mixed case strings', () => {
      expect(service.capitalizeFirst('hELLO')).toBe('Hello');
    });
  });

  describe('truncate', () => {
    it('should truncate string longer than maxLength', () => {
      const str = 'This is a very long string that needs truncation';
      const result = service.truncate(str, 20);
      expect(result.length).toBe(20);
      expect(result).toContain('...');
    });

    it('should not truncate string shorter than maxLength', () => {
      const str = 'Short string';
      const result = service.truncate(str, 20);
      expect(result).toBe(str);
    });

    it('should handle exact length match', () => {
      const str = 'Exactly twenty chars';
      const result = service.truncate(str, 20);
      expect(result).toBe(str);
    });

    it('should handle empty string', () => {
      expect(service.truncate('', 10)).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format number with no decimals by default', () => {
      expect(service.formatNumber(1234567)).toBe('1,234,567');
    });

    it('should format number with specified decimals', () => {
      expect(service.formatNumber(1234.5678, 2)).toBe('1,234.57');
    });

    it('should handle zero', () => {
      expect(service.formatNumber(0)).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(service.formatNumber(-1234.56, 2)).toBe('-1,234.56');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes', () => {
      expect(service.formatFileSize(512)).toBe('512 Bytes');
    });

    it('should format kilobytes', () => {
      expect(service.formatFileSize(1536)).toBe('1.5 KB');
    });

    it('should format megabytes', () => {
      expect(service.formatFileSize(1572864)).toBe('1.5 MB');
    });

    it('should format gigabytes', () => {
      expect(service.formatFileSize(1610612736)).toBe('1.5 GB');
    });

    it('should handle zero bytes', () => {
      expect(service.formatFileSize(0)).toBe('0 Bytes');
    });

    it('should round to 2 decimal places', () => {
      const result = service.formatFileSize(1234);
      expect(result).toMatch(/^\d+\.\d{2} KB$/);
    });
  });

  describe('getRelativeTime', () => {
    let now: Date;

    beforeEach(() => {
      now = new Date('2026-01-15T12:00:00');
      jasmine.clock().install();
      jasmine.clock().mockDate(now);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should return "just now" for very recent times', () => {
      const date = new Date('2026-01-15T11:59:30');
      expect(service.getRelativeTime(date)).toBe('just now');
    });

    it('should return minutes ago for recent past', () => {
      const date = new Date('2026-01-15T11:45:00');
      expect(service.getRelativeTime(date)).toBe('15 minutes ago');
    });

    it('should return hours ago for past hours', () => {
      const date = new Date('2026-01-15T09:00:00');
      expect(service.getRelativeTime(date)).toBe('3 hours ago');
    });

    it('should return days ago for past days', () => {
      const date = new Date('2026-01-13T12:00:00');
      expect(service.getRelativeTime(date)).toBe('2 days ago');
    });

    it('should return formatted date for dates beyond a week', () => {
      const date = new Date('2026-01-01T12:00:00');
      const result = service.getRelativeTime(date);
      expect(result).toContain('1');
      expect(result).toContain('2026');
    });

    it('should handle future times with "in X minutes"', () => {
      const date = new Date('2026-01-15T12:30:00');
      expect(service.getRelativeTime(date)).toBe('in 30 minutes');
    });

    it('should handle future times with "in X hours"', () => {
      const date = new Date('2026-01-15T15:00:00');
      expect(service.getRelativeTime(date)).toBe('in 3 hours');
    });

    it('should handle future times with "in X days"', () => {
      const date = new Date('2026-01-17T12:00:00');
      expect(service.getRelativeTime(date)).toBe('in 2 days');
    });
  });
});
