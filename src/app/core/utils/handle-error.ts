import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export function handleError(err: HttpErrorResponse) {
  console.error('Auth service error:', err);
  return throwError(() => new Error(err.message));
}
