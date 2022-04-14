const roles = ['customer', 'user', 'admin', 'superadmin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[3], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
