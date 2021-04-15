import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlynhapkhoComponent } from './quanlynhapkho.component';

describe('QuanlynhapkhoComponent', () => {
  let component: QuanlynhapkhoComponent;
  let fixture: ComponentFixture<QuanlynhapkhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlynhapkhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlynhapkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
