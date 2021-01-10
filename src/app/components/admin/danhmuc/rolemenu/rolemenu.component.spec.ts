import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemenuComponent } from './rolemenu.component';

describe('RolemenuComponent', () => {
  let component: RolemenuComponent;
  let fixture: ComponentFixture<RolemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
