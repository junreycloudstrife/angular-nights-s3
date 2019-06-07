import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FirebaseServiceService } from 'src/app/services/firebase-service.service'

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: [ './contact.component.scss' ]
})
export class ContactComponent implements OnInit {
	constructor(public firebaseSvc: FirebaseServiceService) {}

	contact = new FormGroup({
		name: new FormControl('', [ Validators.required ]),
		email: new FormControl('', [ Validators.required, Validators.email ]),
		color: new FormControl('', [ Validators.required ])
	})

	records = []

	ngOnInit() {
		this.get()
	}

	async submit() {
		await this.firebaseSvc.addRecord(this.contact.getRawValue())
		await this.get()
	}

	async get() {
		const response = await this.firebaseSvc.getRecord()
		this.records = []
		Object.keys(response).forEach((element) => {
			const toPush = {
				id: element,
				data: response[element]
			}
			this.records.push(toPush)
		})
		this.contact.reset()
		this.records.reverse()
	}
}
