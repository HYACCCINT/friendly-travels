import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStopListComponent } from './edit-stop-list.component';

describe('EditStopListComponent', () => {
  let component: EditStopListComponent;
  let fixture: ComponentFixture<EditStopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
