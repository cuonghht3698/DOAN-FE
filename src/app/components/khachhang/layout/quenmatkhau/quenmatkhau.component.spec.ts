import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuenmatkhauComponent } from './quenmatkhau.component';

describe('QuenmatkhauComponent', () => {
  let component: QuenmatkhauComponent;
  let fixture: ComponentFixture<QuenmatkhauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuenmatkhauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuenmatkhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
