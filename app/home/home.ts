import {Component, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {CsrfService} from '../csrf/csrfService';

@Component( {
	selector: 'home',
	templateUrl: 'app/home/index.html'
})
export class HomeComponent {
    
    csrfService:CsrfService;
    router:Router;
    
    constructor(@Inject(CsrfService)csrfService:CsrfService, @Inject(Router)router:Router) {
        this.csrfService = csrfService;
        this.router = router;
        if (!csrfService.authenticated()) {
            console.clear();
            console.log("User not logged in navigating to login page");
            router.navigateByUrl('/login');
        }
    }
}
