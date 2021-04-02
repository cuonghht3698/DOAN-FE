import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyblogComponent } from './quanlyblog.component';

describe('QuanlyblogComponent', () => {
  let component: QuanlyblogComponent;
  let fixture: ComponentFixture<QuanlyblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
