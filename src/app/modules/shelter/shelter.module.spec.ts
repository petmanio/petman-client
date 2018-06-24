import { ShelterModule } from './shelter.module';

describe('ShelterModule', () => {
  let shelterModule: ShelterModule;

  beforeEach(() => {
    shelterModule = new ShelterModule();
  });

  it('should create an instance', () => {
    expect(shelterModule).toBeTruthy();
  });
});
