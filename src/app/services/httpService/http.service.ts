import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EnvironmentUrlService} from '../environment-url/environment-url.service';

@Injectable({
  providedIn: 'root',

})
export class HttpService {

  constructor(private httpClient: HttpClient,
              private envUrl: EnvironmentUrlService) { }

  get<T>(resourceUrl: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(this.envUrl.urlAddress + resourceUrl, { params: params});
  }

  save<T>(url: string, obj: T, params?: HttpParams): Observable<any> {
    return this.httpClient.post(this.envUrl.urlAddress + url, obj, { params: params });
  }

  uploadPicture(url: string, file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.envUrl.urlAddress + url, data, {
    reportProgress: true,
    responseType: 'text'
  });
    return this.httpClient.request(newRequest);
  }

  /**
   *
   * @param url
   * @param obj
   */
  post<T, R>(url: string, obj: T, params?: HttpParams): Observable<R> {
    return this.httpClient.post<R>(this.envUrl.urlAddress + url, obj, { params: params });
  }

  /**
   *
   * @param url
   * @param obj
   */
  put<T, R>(url: string, obj: T, params?: HttpParams): Observable<R> {
    return this.httpClient.put<R>(this.envUrl.urlAddress + url, obj, { params: params });
  }

  remove(url: string): Observable<any> {
    return this.httpClient.delete(this.envUrl.urlAddress + url);
  }

  /**
   *
   * @param url
   * @param responseType
   * @param callback
   */
  download(
    url: string,
    responseType: 'text' | 'arraybuffer' | 'json' | 'blob' = 'text',
    callback?: (data: HttpResponse<string | ArrayBuffer | Object | Blob>) => void): void {

    let obs: Observable<HttpResponse<string | ArrayBuffer | Object | Blob>>;
    switch (responseType) {
      case 'text':
        obs = this.httpClient.get(url, { observe: 'response', responseType: 'text' });
        break;
      case 'json':
        obs = this.httpClient.get<HttpResponse<Object>>(url, { observe: 'response', responseType: 'json' });
        break;
      case 'blob':
        obs = this.httpClient.get(url, { observe: 'response', responseType: 'blob' });
        break;
      case 'arraybuffer':
        obs = this.httpClient.get(url, { observe: 'response', responseType: 'arraybuffer' });
        break;
      default:
        throw new Error('Invalid response type. One of text, arraybuffer, json or blob is required.');
    }
    obs.subscribe(callback);
  }

}
