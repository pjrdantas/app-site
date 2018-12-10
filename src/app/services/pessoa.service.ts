import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';




import { map } from 'rxjs/operators';

import {Pessoa} from '../services/pessoa';
import {ConfigService} from './config.service';

@Injectable()
export class PessoaService {

    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;

    constructor(private http: Http,
                private configService: ConfigService) { 
        
        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/pessoa/';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }

    /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getPessoas(){        
        return this.http.get(this.baseUrlService).pipe(map(res => res.json()));
    }

    /**ADICIONA UMA NOVA PESSOA */
    addPessoa(pessoa: Pessoa){
        
        return this.http.post(this.baseUrlService, JSON.stringify(pessoa),this.options)
        .pipe(map(res => res.json()));
    }
    /**EXCLUI UMA PESSOA */
    excluirPessoa(codigo:number){

        return this.http.delete(this.baseUrlService + codigo).pipe(map(res => res.json()));
    }

    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getPessoa(codigo:number){
     
        return this.http.get(this.baseUrlService + codigo).pipe(map(res => res.json()));
    }

    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    atualizarPessoa(pessoa:Pessoa){

        return this.http.put(this.baseUrlService, JSON.stringify(pessoa),this.options).pipe(
        map(res => res.json()));
    }

}