import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagHistory: string[] = [];
  private apikey: string = 'PH3m2Ry8TyXRxlf2a4Kxm0FUaEXJZl75';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.laodLocalStorage();
  }

  public gifList: Gif[] = [];

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => tag !== oldTag);
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this._tagHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private laodLocalStorage(): void {
    this._tagHistory = JSON.parse(localStorage.getItem('history') || '[]');

    if (this._tagHistory.length === 0) return;

    this.searchTag(this._tagHistory[0]);
  }

  public searchTag(tag: string) {
    if (tag.length === 0) {
      return;
    }

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
