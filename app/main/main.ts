import 'reflect-metadata';
import {bootstrap}  from 'angular2/platform/browser';
import {bind, Component} from 'angular2/core';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router';

import {Home} from '../home/home';
import {Agent, AgentService} from '../agent/agent';
import {CarrierFormComponent} from '../forms/form';
import {LayoutManager, LayoutPreference, LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective} from '../layout/layout';



@Component({
  selector: 'transport-app',
  templateUrl: 'app/main/index.html',
  directives: [ROUTER_DIRECTIVES, LayoutPreference, LayoutSidebarDirective, LayoutMasterDirective, LayoutContentDirective, LayoutInnerDirective ]
})
@RouteConfig([
  { path: '/', as: 'Home', component: Home },
  { path: '/forms', as: 'Forms', component: CarrierFormComponent },
  { path: '/agents', as: 'Agent', component: Agent }
])
export class TransportApp {
  name: string;
  agents: string[];

  constructor(agentService: AgentService) {
    this.name = 'Alice';
    this.agents = agentService.getAgents();
  }
}


bootstrap(TransportApp, [
  AgentService,
  LayoutManager,
  ROUTER_BINDINGS,
  bind(APP_BASE_HREF).toValue(location.pathname)
]);
