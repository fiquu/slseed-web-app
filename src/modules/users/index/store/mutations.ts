export default {
  setUsers(state, payload: object[]): void {
    state.users.length = 0;
    state.users.push(...payload);
  }
};
