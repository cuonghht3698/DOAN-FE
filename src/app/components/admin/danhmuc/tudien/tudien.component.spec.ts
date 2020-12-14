import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TudienComponent } from './tudien.component';

describe('TudienComponent', () => {
  let component: TudienComponent;
  let fixture: ComponentFixture<TudienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TudienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TudienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
