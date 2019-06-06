import { Component, OnInit } from '@angular/core'
import { FirebaseServiceService } from 'src/app/services/firebase-service.service'

@Component({
	selector: 'app-firebase',
	templateUrl: './firebase.component.html',
	styleUrls: [ './firebase.component.scss' ]
})
export class FirebaseComponent implements OnInit {
	constructor(public firebaseSvc: FirebaseServiceService) {}

	ngOnInit() {}

	login() {
		this.firebaseSvc.login()
	}

	signup() {
		this.firebaseSvc.signup()
	}

	post() {
		this.firebaseSvc.addRecord()
	}

	get() {
		this.firebaseSvc.getRecord()
	}
}
