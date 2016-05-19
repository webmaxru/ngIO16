import { Component, Inject } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdSpinner } from '@angular2-material/progress-circle';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import {Observable} from 'rxjs/Observable';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseRef} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'hello-mobile-app',
  template: `
  <md-toolbar>
    {{title}}
  </md-toolbar>
  <md-spinner *shellRender></md-spinner>
  <div *shellNoRender>
    <md-card>
     <md-card-header>
        <md-card-title>Please post something</md-card-title>
     </md-card-header>
     <md-card-content>
       <md-input placeholder="Your name" #nameInput (keyup)="onKeyUp($event, nameInput, messageInput)">
       </md-input><br />
       <md-input placeholder="Message" #messageInput (keyup)="onKeyUp($event, nameInput, messageInput)">
       </md-input><br />
       <button md-raised-button (click)="createPost(nameInput, messageInput)">Send</button>
     </md-card-content>
    </md-card>
    <md-list>
      <md-list-item *ngFor="let message of messages | async">
        <h3 md-line>{{message.from}}</h3>
        <p md-line>
          <span>{{message.text}}</span>
        </p>
      </md-list-item>
    </md-list>
  </div>
  `,
  styles: [`
    md-spinner {
      margin: 24px auto 0;
    }
  `],
  directives: [APP_SHELL_DIRECTIVES, MdToolbar, MdSpinner, MD_LIST_DIRECTIVES, MdInput, MdButton, MD_CARD_DIRECTIVES ],
  providers: [FIREBASE_PROVIDERS, defaultFirebase('https://ngio16.firebaseio.com')]
})
export class HelloMobileAppComponent {
  title = 'ngIO16';
  messages: Observable<any[]>;
  postsRef: Firebase;

  constructor(af: AngularFire, @Inject(FirebaseRef) ref:Firebase) {
    this.messages = af.list('')
    .map(messages => messages
      .reduce((prev, curr) => {
        prev.unshift(curr);
        return prev;
      }, []));
    this.postsRef = ref;
  }

  onKeyUp($event, nameInput, messageInput) {
    if ($event.which === 13 && messageInput.value) {
      this.createPost(nameInput, messageInput);
    }
  }

  createPost(nameInput, messageInput) {

    this.postsRef.push({
      from: nameInput.value,
      text: messageInput.value
    });

    messageInput.value = null;
  }
}
