import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)
    .pipe
    // For error handling, add operators like catchError as needed
    ();
};
