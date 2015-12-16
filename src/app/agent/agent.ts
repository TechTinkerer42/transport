import {Component, View} from 'angular2/angular2';


@Component( {
	selector: 'agent'
})
@View({
	templateUrl: 'agent/index.html'
})
export class Agent {
}


export class AgentService {
	getAgents() {
		return ['Jimi Hendrix','James Brown'];
	}
}
