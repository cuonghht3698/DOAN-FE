import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoBanhangComponent } from './baocao-banhang.component';

describe('BaocaoBanhangComponent', () => {
  let component: BaocaoBanhangComponent;
  let fixture: ComponentFixture<BaocaoBanhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaoBanhangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoBanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
