const UserResolver = {
  User: {
    fullName({ firstName, lastName }, args) {
      const fullName = `${firstName} ${lastName}`;
      return fullName;
    },
  },
};

export default UserResolver;
