import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterWalletComponent } from './enter-wallet.component';

describe('EnterWalletComponent', () => {
  let component: EnterWalletComponent;
  let fixture: ComponentFixture<EnterWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
