import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from './services/appareil.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs';
import 'rxjs-compat/add/observable/interval';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;
constructor() {}

  ngOnInit() {
  const counter = Observable.interval(1000);
this.counterSubscription = counter.subscribe(
  (value: number) => {
    this.secondes = value;

  }
);
  }
ngOnDestroy(): void {
  this.counterSubscription.unsubscribe();
}
}
