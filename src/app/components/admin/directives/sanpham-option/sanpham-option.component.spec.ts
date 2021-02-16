import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamOptionComponent } from './sanpham-option.component';

describe('SanphamOptionComponent', () => {
  let component: SanphamOptionComponent;
  let fixture: ComponentFixture<SanphamOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
