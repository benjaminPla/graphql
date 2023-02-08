import User from "../../mongoSchemas/user.js";

const userRoot = {
  getAllUsers: async () => await User.find(),
  getByIdUser: async (data) => {
    const { id } = data;
    const user = await User.findOne({ _id: id });
    return user;
  },
  getByNameUser: async (data) => {
    const { name } = data;
    const user = await User.findOne({ name });
    return user;
  },
  addUser: async (data) => {
    const { name, email } = data;
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  },
  editByIdUser: async ({ id, name, email }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (name) user.name = name;
      if (email) user.email = email;
      await user.save();
      return user;
    } catch (error) {
      return error;
    }
  },
  deleteByIdUser: async ({ id }) => {
    try {
      const deletedUser = await User.findOne({ _id: id });
      await User.deleteOne({ _id: id });
      return deletedUser;
    } catch (error) {
      return error;
    }
  },
};

export default userRoot;
