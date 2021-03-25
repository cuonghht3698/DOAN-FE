import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyDonghangComponent } from './quanly-donghang.component';

describe('QuanlyDonghangComponent', () => {
  let component: QuanlyDonghangComponent;
  let fixture: ComponentFixture<QuanlyDonghangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyDonghangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyDonghangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
