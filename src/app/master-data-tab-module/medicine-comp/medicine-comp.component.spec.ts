import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCompComponent } from './medicine-comp.component';

describe('MedicineCompComponent', () => {
  let component: MedicineCompComponent;
  let fixture: ComponentFixture<MedicineCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
