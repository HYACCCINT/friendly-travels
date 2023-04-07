import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Stop, StopObject } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-edit-stop',
  templateUrl: './edit-stop.component.html',
  styleUrls: ['./edit-stop.component.scss']
})
export class EditStopComponent {
  @Output('on-change') onChange = new EventEmitter<Partial<Stop>>();
  @Input() uploadToStop!: (file: HTMLInputElement, stop:Partial<Stop>, contentType: any) => void;
  @Input() deleteStop!: (stopId: string) => void;
  @Input() stop: Stop = new StopObject();;
  stopData!: Stop;
  private activatedRoute = inject(ActivatedRoute);
  travelService: TravelService = inject(TravelService);
  travelId = this.activatedRoute.snapshot.paramMap.get('travelId');

  ngOnInit() {
    this.stopData = { 
      ...this.stop
    };
  }

  onUpdate(st: Partial<Stop>) {
    this.onChange.next(st);
  }

  async uploadFile(file: HTMLInputElement, stop: Partial<Stop>) {
    const path = `/travels/${this.travelId}/stops/${stop.id}`;
    const url = await this.travelService.uploadToStorage(path, file, {contentType: 'image/png'})
    stop.image = url ? url : '';
    this.travelService.updateData(`travels/${this.travelId}/stops/${stop.id}`, stop)
  }

}
