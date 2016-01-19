import {Component} from 'angular2/core';
import {NG_TABLE_DIRECTIVES} from 'ng2-table';


@Component( {
	selector: 'agent',
	templateUrl: 'app/agent/index.html',
	directives: [NG_TABLE_DIRECTIVES]
})
export class AgentComponent {
}


export class AgentService {
	getAgents() {
		return ['Jimi Hendrix','James Brown'];
	}
}
