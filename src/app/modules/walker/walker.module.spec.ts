import { WalkerModule } from './walker.module';

describe('WalkerModule', () => {
  let walkerModule: WalkerModule;

  beforeEach(() => {
    walkerModule = new WalkerModule();
  });

  it('should create an instance', () => {
    expect(walkerModule).toBeTruthy();
  });
});
