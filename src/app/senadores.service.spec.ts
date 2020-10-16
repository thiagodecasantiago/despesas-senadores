import { TestBed } from '@angular/core/testing';

import { SenadoresService } from './senadores.service';

describe('SenadoresService', () => {
  let service: SenadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
