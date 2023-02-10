import User from "../../mongo/schemas/user.js";
import bcrypt from "bcrypt";

const userRoot = {
  getAllUsers: async () => await User.find(),
  getByIdUser: async (data) => {
    try {
      const { id } = data;
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      return error;
    }
  },
  addUser: async (data) => {
    try {
      const { email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  },
  editByIdUser: async ({ id, email, password }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (password) user.password = password;
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
