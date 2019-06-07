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

	isLoggedIn() {
		return localStorage.getItem('idToken') !== null
	}

	getID() {
		return localStorage.getItem('idToken')
	}

	async addRecord(data) {
		const url = `https://angularcebu.firebaseio.com/users.json?auth=${localStorage.getItem('idToken')}`
		return this.http.post(url, data, this.httpOptions).toPromise()
	}

	async getRecord() {
		const url = `https://angularcebu.firebaseio.com/users.json?auth=${localStorage.getItem('idToken')}`
		return this.http.get(url, this.httpOptions).toPromise()
	}

	signup(data, callback) {
		const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${this.apiKey}`
		data['returnSecureToken'] = true
		this.http.post(url, new Blob([ JSON.stringify(data) ]), this.httpOptions).subscribe(
			(response) => {
				this.saveTokens(response)
				callback(response)
			},
			(error) => {
				callback(error)
			}
		)
	}

	login(data, callback) {
		const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`
		data['returnSecureToken'] = true
		this.http.post(url, new Blob([ JSON.stringify(data) ]), this.httpOptions).subscribe(
			(response) => {
				this.saveTokens(response)
				callback(response)
			},
			(error) => {
				callback(error)
			}
		)
	}

	logOut() {
		localStorage.clear()
	}
}
