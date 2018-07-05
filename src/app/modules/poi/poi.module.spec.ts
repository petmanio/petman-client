import { PoiModule } from './poi.module';

describe('PoiModule', () => {
  let poiModule: PoiModule;

  beforeEach(() => {
    poiModule = new PoiModule();
  });

  it('should create an instance', () => {
    expect(poiModule).toBeTruthy();
  });
});
