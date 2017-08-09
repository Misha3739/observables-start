import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';
import {observable} from "rxjs/symbol/observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  normalSubscription: Subscription;
  infiniteSubscription: Subscription;

  constructor() { }

  ngOnInit() {
   const myObservable = Observable.create((observer: Observer<string>) => {
     setTimeout(() => { observer.next('first package'); }, 2000);
     setTimeout(() => { observer.next('second package'); }, 4000);
     setTimeout(() => { observer.error('failed package'); }, 5000);
     setTimeout(() => { observer.next('third package'); }, 6000);
   });

   const  infiniteObservable = Observable.interval(1000);



    this.normalSubscription = myObservable.subscribe(
     (data: string) => {console.log(data); },
     (error: string) => {console.log(error); },
     (completed: string) => {} );

    this.infiniteSubscription = infiniteObservable.subscribe((number: number) => {
      console.log(number);
    });
  }



  ngOnDestroy()
  {
    this.normalSubscription.unsubscribe();

    this.infiniteSubscription.unsubscribe();
  }

}
