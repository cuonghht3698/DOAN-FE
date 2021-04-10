import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoTonghopComponent } from './baocao-tonghop.component';

describe('BaocaoTonghopComponent', () => {
  let component: BaocaoTonghopComponent;
  let fixture: ComponentFixture<BaocaoTonghopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaoTonghopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoTonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
