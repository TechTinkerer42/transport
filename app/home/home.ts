import {Component} from 'angular2/core';
import {LayoutPreference} from '../layout/layout';


@Component( {
	selector: 'home',
	templateUrl: 'app/home/index.html',
	directives: [LayoutPreference]
})
export class HomeComponent {
}
