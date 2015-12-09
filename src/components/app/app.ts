import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';


import { _settings } from '../../settings';
// import {Sidebar} from '../sidebar/sidebar'
import {Home} from '../home/home';
import {About} from '../about/about';
import {TopNav} from '../topnav/topnav';

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: 'components/app/app.html',
  directives: [ ROUTER_DIRECTIVES, TopNav]
})

// This is one way of configuring an application router
// The second way is shown bellow, inside MyApp controller
@RouteConfig([
 { path: '/', name: 'Home', component: Home },
 { path: '/about', name: 'About', component: About }
])
// Component controller
export class MyApp {
  name: string;
  constructor() {
    this.name = 'Alice';
  }
}    