import { SessionGuard } from './session-auth.guard';

describe('SessionGuard', () => {
  it('should be defined', () => {
    expect(new SessionGuard()).toBeDefined();
  });
});
