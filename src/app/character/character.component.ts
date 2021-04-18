import {Component, OnDestroy} from '@angular/core';
import { CharacterService } from './character.service';
import {BehaviorSubject, Observable, Subject, Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  providers: [
    CharacterService
  ]
})
export class CharacterComponent implements OnDestroy{

  items$ = this.service.getAllItems();
  private interval = 1000;
  private complete = 15000;
  private delay = 5000;

  observable$ = new Observable((subscriber: Subscriber<number>) => {
    console.log('new subscription');
    let i = 0;
    const id = setInterval(() => {
      subscriber.next(i);
      i++;
    }, this.interval);
    setTimeout(() => {
      clearInterval(id);
      subscriber.complete();
    }, this.complete);
  });

  subject$ = new Subject();
  behaviorSubject$ = new BehaviorSubject('z');

  private observableSubscription: Subscription | undefined;

  constructor(
    private service: CharacterService) {
    this.initializeSubject();
    this.initializeBehaviorSubject();

    setTimeout(() => {
      this.observableSubscription = this.observable$.subscribe(x => {
        console.log('observable', x);
      });
      this.subject$.subscribe(x => {
        console.log('subject', x);
      });
      this.behaviorSubject$.subscribe(x => {
        console.log('behavior', x);
      });
    }, this.delay);
  }

  private initializeSubject(): void {
    let i = 0;
    const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
    const id = setInterval(() => {
      this.subject$.next(chars[i % 6]);
      i++;
    }, this.interval);
    setTimeout(() => {
      clearInterval(id);
      this.subject$.complete();
    }, this.complete);
  }

  private initializeBehaviorSubject(): void {
    let i = 0;
    const chars = ['z', 'y', 'x', 'w', 'v', 'u'];
    const id = setInterval(() => {
      this.subject$.next(chars[i % 6]);
      i++;
    }, this.interval);
    setTimeout(() => {
      clearInterval(id);
      this.subject$.complete();
    }, this.complete);
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.observableSubscription?.unsubscribe();
  }
}
