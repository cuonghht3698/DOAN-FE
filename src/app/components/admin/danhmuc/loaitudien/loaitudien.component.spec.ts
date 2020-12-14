import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaitudienComponent } from './loaitudien.component';

describe('LoaitudienComponent', () => {
  let component: LoaitudienComponent;
  let fixture: ComponentFixture<LoaitudienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaitudienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaitudienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
