import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private chavePublica = 'b164e14311cd1561eec97b799c07eaed'; //Chave publica da Marvel
  private chavePrivada = 'efec58e7caaafcbad36c8be94fab833afd3fb54c'; //Chave privada da Marvel
  private caminhoPadrao = 'https://gateway.marvel.com:443/v1/public/characters'; //URL padrão

  constructor(private http: HttpClient) {}

  getPopularPersonagens(page: number, limit: number = 10, query: string = '') {
    const ts = new Date().getTime().toString();
    const hash = Md5.hashStr(`${ts}${this.chavePrivada}${this.chavePublica}`);
    const offset = (page - 1) * limit; // Calcular o offset com base na página e no limite
    let url = `${this.caminhoPadrao}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${this.chavePublica}&hash=${hash}`;
    if (query) {
      url += `&nameStartsWith=${query}`;
    }
    return this.http.get(url);
  }
}
