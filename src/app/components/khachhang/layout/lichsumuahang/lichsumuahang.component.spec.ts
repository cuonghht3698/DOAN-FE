import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsumuahangComponent } from './lichsumuahang.component';

describe('LichsumuahangComponent', () => {
  let component: LichsumuahangComponent;
  let fixture: ComponentFixture<LichsumuahangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LichsumuahangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsumuahangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
