import {bootstrap, Component} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    template: `<div class="row">
      <div class="small-12 columns">
      <h1>My Angular 2 App</h1>
      </div>
      </div>`
})
class AppComponent { }

bootstrap(AppComponent);
