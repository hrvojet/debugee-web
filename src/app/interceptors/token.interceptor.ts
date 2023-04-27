import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private route: ActivatedRoute) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.route.queryParams.subscribe((params) => {
			debugger;
			const token = params['token'];
			if (token) {
				localStorage.setItem('token', token);
			}
		});

		return next.handle(req);

		/*return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const token = event.headers.get('token');
          if (token) {
            localStorage.setItem('token', token);
          }
        }
      })
    )*/
	}
}
