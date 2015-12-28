import {bootstrap}  from 'angular2/platform/browser';
import {bind, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

import {HomeComponent} from '../home/home';
import {AgentComponent,AgentService} from '../agent/agent';
import {CarrierFormComponent} from '../forms/form';
import {LayoutManager, LayoutPreference, LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective} from '../layout/layout';



@Component({
  selector: 'transport-app',
  templateUrl: 'app/main/index.html',
  directives: [ROUTER_DIRECTIVES,LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective]
})
@RouteConfig([
  { path: '/app', name: 'Home', component: HomeComponent } ,
  { path: '/forms', name: 'Forms', component: CarrierFormComponent },
  { path: '/agents', name: 'Agent', component: AgentComponent }
])
export class TransportApp {
  somevalue = 'this is some value'

}


bootstrap(TransportApp, [
  ROUTER_PROVIDERS,
  LayoutManager,
  AgentService
]).catch(err => console.error(err));
