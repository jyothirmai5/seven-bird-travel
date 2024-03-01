import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDestinationsComponent } from './search-destinations.component';

describe('SearchDestinationsComponent', () => {
  let component: SearchDestinationsComponent;
  let fixture: ComponentFixture<SearchDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
