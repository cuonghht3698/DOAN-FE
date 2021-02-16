import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaphangComponent } from './nhaphang.component';

describe('NhaphangComponent', () => {
  let component: NhaphangComponent;
  let fixture: ComponentFixture<NhaphangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhaphangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaphangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
