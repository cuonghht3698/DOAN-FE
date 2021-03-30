import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyChatComponent } from './quanly-chat.component';

describe('QuanlyChatComponent', () => {
  let component: QuanlyChatComponent;
  let fixture: ComponentFixture<QuanlyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
