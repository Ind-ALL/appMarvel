import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../../usuario/autenticacao.service';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.page.html',
  styleUrls: ['./inserir.page.scss'],
})
export class InserirPage implements OnInit {

  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  insereUsuario() {
    this.autenticacaoService.insereNoFirebase(this.email, this.senha).then((res) => {
      this.router.navigate(['app/tabs/tab1']);
    }).catch((error) => {
      this.mensagem = "Erro ao incluir usuário";
      this.exibeMensagem();
    });
  }

  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastController } from '@ionic/angular';
// import { AutenticacaoService } from '../../usuario/autenticacao.service';

// @Component({
//   selector: 'app-inserir',
//   templateUrl: './inserir.page.html',
//   styleUrls: ['./inserir.page.scss'],
// })
// export class InserirPage implements OnInit {

//   public email:string="";
//   public senha:string="";
//   public mensagem: string="";

//   insereUsuario(){
//     this.autenticacaoService.insereNoFireBase(this.email, this.senha).then((res) => {
//       this.router.navigate(['app/tabs/tab1']);
//     }).catch((error) => {
//       this.mensagem = "Erro ao inclir usuário";
//       this.exibeMensagem()
//     })
//   }

//   async exibeMensagem(){
//     const toast = await this.toastController.create({
//       message: this.mensagem,
//       duration: 2000
//     });
//     toast.present();
//   }
// }
