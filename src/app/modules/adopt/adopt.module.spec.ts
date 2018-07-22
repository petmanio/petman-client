import { AdoptModule } from './adopt.module';

describe('AdoptModule', () => {
  let adoptModule: AdoptModule;

  beforeEach(() => {
    adoptModule = new AdoptModule();
  });

  it('should create an instance', () => {
    expect(adoptModule).toBeTruthy();
  });
});
