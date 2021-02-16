import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSPComponent } from './option-sp.component';

describe('OptionSPComponent', () => {
  let component: OptionSPComponent;
  let fixture: ComponentFixture<OptionSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionSPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
