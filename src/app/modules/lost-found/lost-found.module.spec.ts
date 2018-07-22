import { LostFoundModule } from './lost-found.module';

describe('LostFoundModule', () => {
  let lostFoundModule: LostFoundModule;

  beforeEach(() => {
    lostFoundModule = new LostFoundModule();
  });

  it('should create an instance', () => {
    expect(lostFoundModule).toBeTruthy();
  });
});
