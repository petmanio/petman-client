import { RxDebouncePipe } from './rx-debounce.pipe';

describe('RxDebouncePipe', () => {
  it('create an instance', () => {
    const pipe = new RxDebouncePipe();
    expect(pipe).toBeTruthy();
  });
});
