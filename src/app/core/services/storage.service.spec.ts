import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item from localStorage', () => {
    service.setItem('test-key', 'test-value');
    expect(service.getItem('test-key')).toBe('test-value');
  });

  it('should remove item from localStorage', () => {
    service.setItem('test-key', 'test-value');
    service.removeItem('test-key');
    expect(service.getItem('test-key')).toBeNull();
  });

  it('should clear localStorage', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });
});
