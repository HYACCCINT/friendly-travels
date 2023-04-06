import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { TravelService } from '../../services/travel.service';
import { Stop, Travel } from 'src/app/models/travel.model';

@Component({
  selector: 'app-my-travels',
  templateUrl: './my-travels.component.html',
  styleUrls: ['./my-travels.component.scss']
})
export class MyTravelsComponent {
	travelService: TravelService = inject(TravelService);
	user$ = this.travelService.user$;
	travelsData$: Observable<Travel[]>;
	stopsList$!: Observable<Stop[]>;
	selectedTravel!: String;
	constructor() {
		this.travelsData$ = this.travelService.getCollectionData(`travels`) as Observable<Travel[]>;
	}

	async createTravel(userId: String) {
		await this.travelService.addEmptyTravel(userId);
	  }

	  onSelectTravelUpdate(travelId: String) {
		this.selectedTravel = travelId;
		this.stopsList$ = this.travelService.getCollectionData(`travels/${this.selectedTravel}/stops`) as Observable<Stop[]>;
	  }
}
