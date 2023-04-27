import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					let access = event.headers.get('access_token');
					if (access) {
						localStorage.setItem('access_token', access);
					}
				}
			})
		);
	}
}
