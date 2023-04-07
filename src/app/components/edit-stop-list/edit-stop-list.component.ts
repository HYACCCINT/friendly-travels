import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Stop } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-edit-stop-list',
  templateUrl: './edit-stop-list.component.html',
  styleUrls: ['./edit-stop-list.component.scss']
})
export class EditStopListComponent {
  @Output('on-change') onChange = new EventEmitter<Partial<Stop>>();
  @Input() stops: Stop[] = [];
  @Input() travelId: string = '';
  @Input() addStop!: (travelId: string) => void;
  @Input() deleteStop!: (stopId: string) => void;
  @Input() uploadFileToStop!: (file: HTMLInputElement, stop:Partial<Stop>, contentType: any) => void;
  stopsList: Stop[] = [];
  travelService: TravelService = inject(TravelService);
  
  ngOnInit() {
    this.stops.forEach(stop => {
      this.stopsList.push(
        {...stop}
      )
    })
  }

  onUpdate(st: Partial<Stop>) {
    this.onChange.next(st);
  }
}
