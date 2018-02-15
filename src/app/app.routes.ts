import { RouterModule, Routes } from '@angular/router';

//Guards
import  { AuthGuardService } from './services/auth-guard.service';

//Components
import { ChatComponent } from './components/chat/chat.component'
import { LoginComponent } from './components/login/login.component'


const APP_ROUTES: Routes = [
	{ path: 'login', component:LoginComponent},
	{ path: 'chat', component:ChatComponent,  canActivate: [ AuthGuardService ]},
	{ path: '', pathMatch: 'full', redirectTo: 'login'},
	{ path: '**', pathMatch: 'full', redirectTo: 'login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });