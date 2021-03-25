import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietDonhangComponent } from './chitiet-donhang.component';

describe('ChitietDonhangComponent', () => {
  let component: ChitietDonhangComponent;
  let fixture: ComponentFixture<ChitietDonhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietDonhangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietDonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
