// Angular2
// Angular2 Router Injectables https://github.com/angular/angular/blob/f999d5a1566d3b830fd1a23ed554cbed4e1215e8/modules/angular2/router.ts
// import {DummyService} from './services/dummyService';
// import {httpInjectables} from 'angular2/http';


import {bootstrap, Component, View, provide} from 'angular2/angular2';
import {RouteConfig, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';


import {Home} from './home/home';
import {Agent} from './agent/agent';

@Component({
  selector: 'transport-app'
})
@View({
  templateUrl: 'index.html'
})

// This is one way of configuring an application router
// The second way is shown bellow, inside MyApp controller
@RouteConfig([
 { path: '/', name: 'Home', component: Home },
 { path: '/agents', name: 'Agent', component: Agent }
])
// Component controller
export class TransportApp {
  name: string;
  constructor() {
    this.name = 'Alice';
  }
}


// Second parameter provides a set of additional bindings
// that will be used by Component (in our case application)
// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
bootstrap(TransportApp, [ROUTER_PROVIDERS,
	provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
