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

	selectedTravel!: String;
	constructor() {
	}

	async createTravel(userId: String) {
	  }

	  onSelectTravelUpdate(travelId: String) {
		this.selectedTravel = travelId;
	  }
	  editTravel(travelId: String) {
	  }
	  deleteTravel(travelId: String) {
	  }
}
