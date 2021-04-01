import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongsokythuatComponent } from './thongsokythuat.component';

describe('ThongsokythuatComponent', () => {
  let component: ThongsokythuatComponent;
  let fixture: ComponentFixture<ThongsokythuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongsokythuatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongsokythuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
