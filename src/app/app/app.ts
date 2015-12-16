

import {bootstrap, bind, Component, View} from 'angular2/angular2';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router';

import {Home} from '../home/home.js';
import {Agent,AgentService} from '../agent/agent.js';


@Component({
  selector: 'transport-app'
})
@View({
  templateUrl: 'app/index.html',
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


bootstrap(TransportApp, [
   AgentService,
   ROUTER_BINDINGS,
   bind(APP_BASE_HREF).toValue(location.pathname)
 ]);
