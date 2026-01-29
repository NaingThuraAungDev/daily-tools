import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { LoginResponse } from '../models/user.model';
import { environment } from '@environments/environment';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, StorageService],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        storageService = TestBed.inject(StorageService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login successfully', () => {
        const mockResponse: LoginResponse = {
            token: 'test-token',
            user: {
                id: '1',
                email: 'test@example.com',
                name: 'Test User',
                roles: ['user'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        };

        const credentials = { email: 'test@example.com', password: 'password' };

        service.login(credentials).subscribe((response) => {
            expect(response).toEqual(mockResponse);
            expect(service.isAuthenticated()).toBe(true);
            expect(service.currentUser()).toEqual(mockResponse.user);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });

    it('should logout successfully', () => {
        service.logout();
        expect(service.isAuthenticated()).toBe(false);
        expect(service.currentUser()).toBeNull();
    });
});
