import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.page';
import { AuthService } from '@core/services/auth.service';
import { AuthStore } from '../auth.store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [LoginComponent, ReactiveFormsModule],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy },
                AuthStore,
            ],
        }).compileComponents();

        authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize login form with empty values', () => {
        expect(component.loginForm.get('email')?.value).toBe('');
        expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should validate email field', () => {
        const emailControl = component.loginForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.hasError('email')).toBe(true);

        emailControl?.setValue('valid@email.com');
        expect(emailControl?.hasError('email')).toBe(false);
    });
});
