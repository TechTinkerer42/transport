

import 'reflect-metadata';
import {bootstrap} from 'angular2/bootstrap';
import {bind, Component, View} from 'angular2/core';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router';

import {Home} from 'app/home/home';
import {Agent,AgentService} from 'app/agent/agent';

@Component({
  selector: 'transport-app'
})
@View({
  templateUrl: 'main/index.html',
  directives: ROUTER_DIRECTIVES
})
@RouteConfig([
 { path: '/', as: 'Home', component: Home },
 { path: '/agents', as: 'Agent', component: Agent}
])
export class TransportApp {
  name: string;
  agents: string[];

  constructor(agentService: AgentService) {
    this.name = 'Alice';
    this.agents = agentService.getAgents();
  }
}

bootstrap(TransportApp , [
   AgentService,
   ROUTER_BINDINGS,
   bind(APP_BASE_HREF).toValue(location.pathname)
 ] );
