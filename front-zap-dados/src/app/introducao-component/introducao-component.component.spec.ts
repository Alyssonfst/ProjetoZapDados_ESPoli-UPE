import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducaoComponentComponent } from './introducao-component.component';

describe('IntroducaoComponentComponent', () => {
  let component: IntroducaoComponentComponent;
  let fixture: ComponentFixture<IntroducaoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroducaoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducaoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
