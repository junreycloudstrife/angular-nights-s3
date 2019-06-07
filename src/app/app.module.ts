import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module.module'
import { HeaderComponent } from './pages/layouts/header/header.component'
import { HomeComponent } from './pages/home/home.component'
import { FeedComponent } from './components/feed/feed.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChatServiceService } from './services/chat-service.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BotDialogComponent } from './components/bot-dialog/bot-dialog.component'
import { FirebaseServiceService } from './services/firebase-service.service'
import { FirebaseComponent } from './pages/firebase/firebase.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component'

@NgModule({
	declarations: [ AppComponent, HeaderComponent, HomeComponent, FeedComponent, BotDialogComponent, FirebaseComponent, ContactComponent, ContactInfoComponent ],
	imports: [ MaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule ],
	providers: [
		ChatServiceService,
		FirebaseServiceService
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: FirebaseAuthInterceptorService,
		// 	multi: true
		// }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
