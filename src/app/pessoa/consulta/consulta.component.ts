import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
 
import {PessoaService} from '../../services/pessoa.service';
 
import {Pessoa} from '../../services/pessoa';
 
import {Response} from '../../services/response';
 
@Component({
    selector: 'app-consulta-pessoa',
    templateUrl: './consulta.component.html',
    styleUrls:["./consulta.component.css"]
  })
  export class ConsultaComponent implements OnInit {
 
    private pessoas: Pessoa[] = new Array();
    private titulo:string;
 
    constructor(private pessoaService: PessoaService,
                private router: Router){}
 
    ngOnInit() {
 
      
      this.titulo = "Registros Cadastrados";
      this.pessoaService.getPessoas().subscribe(res => this.pessoas = res);
    }
 
    excluir(codigo:number, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
 
        this.pessoaService.excluirPessoa(codigo).subscribe(response => {
 
              let res:Response = <Response>response;
 
              if(res.codigo == 1){
                alert(res.mensagem);
                this.pessoas.splice(index,1);
              }
              else{
                /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
                alert(res.mensagem);
              }
          },
          (erro) => {                    
               /*MOSTRA ERROS NÃO TRATADOS */
               alert(erro);
          });        
      }
 
    }
 
    editar(codigo:number):void{
 
      this.router.navigate(['/cadastro-pessoa',codigo]);
 
    }
 
  }