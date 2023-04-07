import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { TravelService } from '../../services/travel.service';
import { Stop, Travel } from 'src/app/models/travel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-travels',
  templateUrl: './my-travels.component.html',
  styleUrls: ['./my-travels.component.scss']
})
export class MyTravelsComponent {
	travelService = inject(TravelService);
	user$ = this.travelService.user$;
	selectedTravel!: String;
	travelsData$: Observable<Travel[]>;
	stopsList$!: Observable<Stop[]>;
	router = inject(Router);
	constructor() {
		this.travelsData$ = this.travelService.getCollectionData(`travels`) as Observable<Travel[]>
	}

	async createTravel(userId: String) {
		this.travelService.addEmptyTravel(userId);

	  }

	  onSelectTravelUpdate(travelId: String) {
		this.selectedTravel = travelId;
	  }
	  editTravel(travelId: String) {
		this.router.navigate(['edit', `${travelId}`]);
	  }
	  deleteTravel(travelId: String) {
		this.travelService.deleteData(`travels/${travelId}`)
	  }
}
