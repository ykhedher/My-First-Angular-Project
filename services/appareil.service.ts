import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {error} from 'selenium-webdriver';
import {parseHttpResponse} from 'selenium-webdriver/http';

@Injectable()
export class AppareilService {
  appareilSubject = new Subject<any[]>();
  private appareils = [];
  constructor(private httpclient: HttpClient) {}
  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }
  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }
  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }
  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }
  addAppareil(name: string, stauts: string) {
    const appareilObject = {
      id: 0,
      name: '',
      stauts: ''
    };
    appareilObject.name = name;
    appareilObject.stauts = stauts;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  saveAppareilToServeur() {
    this.httpclient
      .put('https://http-client-demo-yk.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement Terminé !');
        },
        (error) => {
          console.log('erreur' + error);
        }
      );
  }
  getAppareilsFormServeur() {
    this.httpclient
      .get<any>('https://http-client-demo-yk.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur de chargement ! ' + error);
        }
      );
  }
}
