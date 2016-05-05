import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
import {Login} from './components/authentication/login';
import {Signup} from './components/authentication/signup';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
  _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_viewContainerRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '/login': true,
      '/signup': true,
      '/home': true
    };
  }

  activate(instruction: ComponentInstruction) {
    var url = this.parentRouter.lastNavigationAttempt;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}
