import {bootstrap}  from 'angular2/platform/browser';
import {bind, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';

import {HomeComponent} from '../home/home';
import {AgentComponent,AgentService} from '../agent/agent';
import {CarrierFormComponent} from '../forms/form';
import {LayoutManager,LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, OffCanvasButton} from '../layout/layout';



@Component({
  selector: 'transport-app',
  templateUrl: 'app/main/index.html',
  providers:[],
  directives: [ROUTER_DIRECTIVES,DROPDOWN_DIRECTIVES,
    LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective,OffCanvasButton]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent } ,
  { path: '/forms', name: 'Forms', component: CarrierFormComponent },
  { path: '/agents', name: 'Agent', component: AgentComponent }
])
export class TransportApp {
  somevalue = 'this is some value'
}


bootstrap(TransportApp, [
  ROUTER_PROVIDERS,
  LayoutManager,
  AgentService,
  bind(APP_BASE_HREF).toValue(location.pathname)
]).catch(err => console.error(err));
