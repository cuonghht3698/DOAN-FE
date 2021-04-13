import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaohoadonComponent } from './taohoadon.component';

describe('TaohoadonComponent', () => {
  let component: TaohoadonComponent;
  let fixture: ComponentFixture<TaohoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaohoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaohoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
