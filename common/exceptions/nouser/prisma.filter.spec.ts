import { NotFoundErrorFilter } from './prisma.filter';

describe('NouserFilter', () => {
  it('should be defined', () => {
    expect(new NotFoundErrorFilter()).toBeDefined();
  });
});
