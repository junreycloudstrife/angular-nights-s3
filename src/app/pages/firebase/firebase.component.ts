import { Component, OnInit } from '@angular/core'
import { FirebaseServiceService } from 'src/app/services/firebase-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
	selector: 'app-firebase',
	templateUrl: './firebase.component.html',
	styleUrls: [ './firebase.component.scss' ]
})
export class FirebaseComponent implements OnInit {
	constructor(public firebaseSvc: FirebaseServiceService) {}
	accountCreateForm = new FormGroup({
		email: new FormControl('', [ Validators.email, Validators.required ]),
		password: new FormControl('', [ Validators.required, Validators.minLength(5) ])
	})

	isSignUp = false
	isNotLoggedIn = true
	errorMessage = ''

	ngOnInit() {
		this.isNotLoggedIn = !this.firebaseSvc.isLoggedIn()
	}

	resetForm() {
		this.accountCreateForm.reset()
		this.errorMessage = ''
	}

	login() {
		if (this.accountCreateForm.valid) {
			this.firebaseSvc.login(this.accountCreateForm.getRawValue(), (resp) => {
				if (resp.hasOwnProperty('error')) {
					this.errorMessage = 'Email or password incorrect'
				} else {
					this.isNotLoggedIn = false
					this.errorMessage = ''
				}
			})
		}
	}

	logOut() {
		this.firebaseSvc.logOut()
		this.isNotLoggedIn = true
	}

	signup() {
		if (this.accountCreateForm.valid) {
			this.firebaseSvc.signup(this.accountCreateForm.getRawValue(), (resp) => {
				console.log(resp)
				if (resp.hasOwnProperty('error')) {
					this.errorMessage = 'An existing record of the email exists'
				} else {
					this.isNotLoggedIn = false
					this.errorMessage = ''
				}
			})
		}
	}
}
