import {Component} from 'angular2/core';


@Component( {
	selector: 'agent',
	templateUrl: 'app/agent/index.html'
})
export class AgentComponent {
}


export class AgentService {
	getAgents() {
		return ['Jimi Hendrix','James Brown'];
	}
}
