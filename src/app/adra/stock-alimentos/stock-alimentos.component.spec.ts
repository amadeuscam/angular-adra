import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAlimentosComponent } from './stock-alimentos.component';

describe('StockAlimentosComponent', () => {
  let component: StockAlimentosComponent;
  let fixture: ComponentFixture<StockAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAlimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
