import {bootstrap, Component} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    template: `<div class="row">
      <div class="small-12 columns">
      <h1>Transport2 Angular2 POC</h1>
      </div>
      </div>`
})
class AppComponent { }

bootstrap(AppComponent);
