import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../usuario/autenticacao.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  loginUsuario() {
    this.autenticacaoService.loginNoFirebase(this.email, this.senha).then((res) => {
      this.router.navigate(['app/tabs/tab1']);
    }).catch((error) => {
      this.mensagem = "Erro ao fazer login";
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
