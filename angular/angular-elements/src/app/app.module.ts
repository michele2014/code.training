import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';



import { AppComponent } from './app.component';
import { FrameworkPollComponent } from './framework-poll/framework-poll.component';


var config = {
    apiKey: "AIzaSyAU9XSZBfdlGOfJsBLy-by39nab_KlyRpc",
    authDomain: "framework-voter-3778c.firebaseapp.com",
    databaseURL: "https://framework-voter-3778c.firebaseio.com",
    projectId: "framework-voter-3778c",
    storageBucket: "framework-voter-3778c.appspot.com",
    messagingSenderId: "391659224657"
};


@NgModule({
    declarations: [
        AppComponent,
        FrameworkPollComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule
    ],
    providers: [],
    entryComponents: [
        FrameworkPollComponent
    ]
})
export class AppModule {
    constructor(private injector: Injector) {}

    ngDoBootstrap() {
        const el = createCustomElement(FrameworkPollComponent, { injector: this.injector });
        customElements.define('framework-poll', el);
    }

}