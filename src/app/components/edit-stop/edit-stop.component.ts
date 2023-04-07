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

  ngOnInit() {
  }

  onUpdate(st: Partial<Stop>) {
    this.onChange.next(st);
  }

  async uploadFile(file: HTMLInputElement, stop: Partial<Stop>) {
  }

}
