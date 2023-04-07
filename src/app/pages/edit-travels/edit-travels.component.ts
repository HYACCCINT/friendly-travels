import { Component, OnInit, inject } from '@angular/core';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, Timestamp, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, switchMap } from 'rxjs';
import { Stop, Travel } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-edit-travels',
  templateUrl: './edit-travels.component.html',
  styleUrls: ['./edit-travels.component.scss']
})
export class EditTravelsComponent {
  
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}
  
  updateCurrentTravel(travel: Partial<Travel>) {
  }

  updateCurrentStop(stop: Partial<Stop>) {
  }

  addStop() {
  }
  deleteStop(stopId: string) {
  }
  
}
