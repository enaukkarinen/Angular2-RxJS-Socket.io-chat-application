
import {Observable} from 'rxjs';

export function doodles() {
    // Promise
    // Once promise fires, it cannot be cancelled
    let promise = new Promise(resolve => {
        setTimeout(() => {
            resolve('promise timeout');
        }, 2000);

    });
    promise.then(value => { console.log(value); });


    // Observable
    // Is cancellable
    let stream1$ = new Observable(observer => {

        setTimeout(function () {
            observer.next('observable timeout 1');
        }, 2000);

    });
    stream1$.subscribe(value => { console.log(value); });


    // Cancelling an Observable
    let stream2$ = new Observable(observer => {

        let timeout = setTimeout(function () {
            observer.next('observable timeout 2');
        }, 2000);

        return () => {
            clearImmediate(timeout);
        };

    });
    let disposable = stream2$.subscribe(value => { console.log(value); });

    // Observable is cancelled before it's able to emit a value.
    setTimeout(function () {
        disposable.unsubscribe();
    }, 1000);

    /*
    * A Stream of values
    Unlike promises, Observables can emit multiple values
    */
    let stream3$ = new Observable(observer => {
        let count = 0;
        let interval = setInterval(() => {
            observer.next(count++);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    });

    // RxJS: filter
    let disposable2 = stream3$
        .filter((value: number) => value % 2 === 0) // rxjs operators
        .subscribe(value => { console.log(value); });
    //-1-2-3-4-5-6-7-8->
    // filter
    //---2---4---6---8-->

    // cancelled after 5 sec
    setTimeout(function () {
        disposable2.unsubscribe();
    }, 5000);

    // RxJS: map
    let disposable3 = stream3$
        .map((value: number) => value * value) // rxjs operators
        .subscribe(value => { console.log(value); });
    //-1-2-3-4-5-6-7-8->
    // map
    //-1-4-9-16-25-36-45-64->

    // cancelled after 5 sec
    setTimeout(function () {
        disposable3.unsubscribe();
    }, 5000);
}
