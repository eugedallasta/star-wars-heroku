import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorStarshipsComponent } from './actor-starships.component';

describe('ActorStarshipsComponent', () => {
  let component: ActorStarshipsComponent;
  let fixture: ComponentFixture<ActorStarshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorStarshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorStarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
