import { SitterModule } from './sitter.module';

describe('SitterModule', () => {
  let sitterModule: SitterModule;

  beforeEach(() => {
    sitterModule = new SitterModule();
  });

  it('should create an instance', () => {
    expect(sitterModule).toBeTruthy();
  });
});
