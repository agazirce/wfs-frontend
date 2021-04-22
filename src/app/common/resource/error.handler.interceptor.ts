import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

enum ErrorType {
  resourceTypeNotFound = 'RESOURCE_TYPE_NOT_FOUND',
  unhandledError = 'UNHANDLED_ERROR',
  invalidCredentials = 'INVALID_CREDENTIALS',
  invalidToken = 'INVALID_TOKEN',
  missingToken = 'MISSING_TOKEN',
  invalidPermission = 'INVALID_PERMISSION'
}

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => {
          this.snackBar.open(this.getMessage(err.error.type), 'Close', {duration: 5000});
          console.error(err);
          return throwError(err);
        })
      );
  }

  private getMessage(errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.invalidPermission:
        return `vous n'avez pas les droits pour effectuer cette action`;
      case ErrorType.invalidToken:
      case ErrorType.invalidCredentials:
      case ErrorType.missingToken:
        return 'Vous devez vous authentifier pour accéder à cette donnée.';
      case ErrorType.resourceTypeNotFound:
      case ErrorType.unhandledError:
        return 'Cette requête a généré une erreur.';
    }
  }
}
