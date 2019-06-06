import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as uuid from 'uuid/v4'

@Injectable({
	providedIn: 'root'
})
export class FirebaseServiceService {
	constructor(public http: HttpClient) {}
	apiKey = 'AIzaSyA9WeOMufvpysOi0xfJ0aiXM2k6g2YP1v0'
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	saveTokens(data: Object) {
		console.log(data)
		Object.keys(data).forEach((key) => {
			localStorage.setItem(key, data[key])
		})
	}

	addRecord() {
		const url = `https://angularcebu.firebaseio.com/users.json?auth=${localStorage.getItem('idToken')}`
		const data = {
			name: 'Cyrus Zandro Hiyas',
			age: '23'
		}

		console.log(url)

		this.http.post(url, data, this.httpOptions).subscribe((response) => {
			console.log(response)
		})
	}

	getRecord() {
		const url = `https://angularcebu.firebaseio.com/users.json?auth=${localStorage.getItem('idToken')}`

		console.log(url)

		this.http.get(url, this.httpOptions).subscribe((response) => {
			console.log(response)
		})
	}

	signup() {
		const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${this.apiKey}`
		const data = {
			email: 'chiyas@agsx.net',
			password: 'helloworld',
			returnSecureToken: true
		}
		console.log(data)
		this.http.post(url, new Blob([ JSON.stringify(data) ]), this.httpOptions).subscribe((response) => {
			this.saveTokens(response)
		})
	}

	login() {
		const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`
		const data = {
			email: 'chiyas@agsx.net',
			password: 'helloworld',
			returnSecureToken: true
		}
		console.log(data)
		this.http.post(url, new Blob([ JSON.stringify(data) ]), this.httpOptions).subscribe((response) => {
			this.saveTokens(response)
		})
	}
}
