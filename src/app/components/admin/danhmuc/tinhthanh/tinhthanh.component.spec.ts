import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhthanhComponent } from './tinhthanh.component';

describe('TinhthanhComponent', () => {
  let component: TinhthanhComponent;
  let fixture: ComponentFixture<TinhthanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinhthanhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhthanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
