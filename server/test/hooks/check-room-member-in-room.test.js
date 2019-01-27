const feathers = require('@feathersjs/feathers');
const checkRoomMemberInRoom = require('../../src/hooks/check-room-member-in-room');

describe('\'check-room-member-in-room\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: checkRoomMemberInRoom()
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').get('test');
    expect(result).toEqual({ id: 'test' });
  });
});
