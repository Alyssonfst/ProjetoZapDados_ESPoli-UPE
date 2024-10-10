import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioTempoUsoComponent } from './relatorio-tempo-uso.component';

describe('RelatorioTempoUsoComponent', () => {
  let component: RelatorioTempoUsoComponent;
  let fixture: ComponentFixture<RelatorioTempoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioTempoUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioTempoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
