import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MarvelService]
})
export class Tab2Page implements OnInit {

  public lista_personagens: any[] = [];
  public page: number = 1;
  public limit: number = 10;
  public query: string = '';
  public pesquisaRealizada: boolean = false;

  constructor(
    private marvelService: MarvelService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregaPagina();
  }

  async carregaPagina() {
    const loading = await this.loadingController.create({
      message: 'Carregando Personagens',
      duration: 1000
    });
    await loading.present();

    this.marvelService.getPopularPersonagens(this.page, this.limit, this.query).subscribe(
      (data: any) => {
        if (this.page === 1) {
          this.lista_personagens = data.data.results;
        } else {
          this.lista_personagens = this.lista_personagens.concat(data.data.results);
        }
        this.pesquisaRealizada = true;
        console.log(this.lista_personagens);
        loading.dismiss();
      },
      error => {
        console.error(error);
        loading.dismiss();
      }
    );
  }

  ionViewDidEnter() {
    this.carregaPagina();
  }

  efeitoRefresh(event: CustomEvent) {
    this.page = 1;
    this.marvelService.getPopularPersonagens(this.page, this.limit, this.query).subscribe(
      (data: any) => {
        this.lista_personagens = data.data.results;
        this.pesquisaRealizada = true;
        if (event.target) {
          (event.target as HTMLIonRefresherElement).complete();
        }
      },
      error => {
        console.error(error);
        if (event.target) {
          (event.target as HTMLIonRefresherElement).complete();
        }
      }
    );
  }

  efeitoScrollInfinito(event: CustomEvent) {
    this.page++;
    this.marvelService.getPopularPersonagens(this.page, this.limit, this.query).subscribe(
      (data: any) => {
        this.lista_personagens = this.lista_personagens.concat(data.data.results);
        if (event.target) {
          (event.target as HTMLIonInfiniteScrollElement).complete();
        }
      },
      error => {
        console.error(error);
        if (event.target) {
          (event.target as HTMLIonInfiniteScrollElement).complete();
        }
      }
    );
  }

  realizarPesquisa() {
    this.page = 1;
    this.carregaPagina();
  }

  sair() {
    this.router.navigate(['']);
  }

  imgError(event: Event, personagem: any) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/logo-marvel-Photoroom.png';
    console.error(`Imagem não carregada para o personagem: ${personagem.name}`);
    console.error('URL da imagem com erro:', personagem.thumbnail.path + '.' + personagem.thumbnail.extension);
  }

  logUrl(personagem: any) {
    console.log('Image URL:', personagem.thumbnail.path + '.' + personagem.thumbnail.extension);
  }
}

