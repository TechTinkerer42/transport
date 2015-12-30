import {bootstrap}  from 'angular2/platform/browser';
import {provide, bind, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import {RequestOptions, RequestMethod, Http, Headers, HTTP_BINDINGS} from 'angular2/http';

import {HomeComponent} from '../home/home';
import {AgentComponent,AgentService} from '../agent/agent';
import {CarrierFormComponent} from '../forms/form';
import {Login} from '../login/login';
import {AuthenticationService} from '../authentication/authentication';

import {LayoutManager, LayoutPreference, LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective} from '../layout/layout';



@Component({
  selector: 'transport-app',
  templateUrl: 'app/main/index.html',
  providers:[],
  directives: [ROUTER_DIRECTIVES,LayoutPreference,LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent } ,
  { path: '/forms', name: 'Forms', component: CarrierFormComponent },
  { path: '/agents', name: 'Agent', component: AgentComponent },
  { path: '/login', name: 'Login', component: Login }
])
export class TransportApp {
  somevalue = 'this is some value'
}

bootstrap(TransportApp, [
  ROUTER_PROVIDERS,
  LayoutManager,
  AgentService,
  HTTP_BINDINGS,
  AuthenticationService,
  
  bind(APP_BASE_HREF).toValue(location.pathname)
]).catch(err => console.error(err));
