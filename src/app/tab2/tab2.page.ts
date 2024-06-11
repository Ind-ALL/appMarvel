import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private marvelService: MarvelService,
    private loadingController: LoadingController
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

    this.marvelService.getPopularPersonagens(this.page, this.limit).subscribe(
      (data: any) => {
        if (this.page === 1) {
          this.lista_personagens = data.data.results;
        } else {
          this.lista_personagens = this.lista_personagens.concat(data.data.results);
        }
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
    this.marvelService.getPopularPersonagens(this.page, this.limit).subscribe(
      (data: any) => {
        this.lista_personagens = data.data.results;
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
    this.marvelService.getPopularPersonagens(this.page, this.limit).subscribe(
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
}










// import { Component, OnInit } from '@angular/core';
// import { MarvelService } from '../services/marvel.service';

// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss'],
// })
// export class Tab2Page implements OnInit {

//   public lista_personagens: any[] = [];
//   loadingController: any;
//   public page:number = 1;

//   constructor(private marvelService: MarvelService) {}

//   ngOnInit() {
//     this.carregaPagina();
//   }

//   carregaPagina() {
//     this.marvelService.getPopularPersonagens(10).subscribe(
//       (data: any) => {
//         this.lista_personagens = data.data.results;
//         if(this.page==1){
//           this.lista_personagens = response.results;
//         }else{
//           this.lista_personagens = this.lista_personagens.concat(Response.results)
//         }
//         console.log(this.lista_personagens);
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }

//   async efeitoLoading(){
//     const loading = await this.loadingController.create({
//       message: 'Carregando Personagens',
//       duration: 1000
//     });
//     await loading.present();
//     const {role, data} = await loading.OnDidDismiss();
//   }

//   ionViewDidEnter(){
//     this.efeitoLoading();
//     this.carregaPagina();
//   }

//   efeitoRefresh(event){
//     this.page = 1;
//     this.carregaPagina();
//   }

//   setTimeout(() =>{
//     event.target.complet();
//   }, 500);
// }
