import jwt from "jsonwebtoken";
import "dotenv/config.js";

const loginRoot = {
  getToken: (data) => {
    try {
      const { email } = data;
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "10s",
      });
      return { token };
    } catch (error) {
      return error;
    }
  },
};

export default loginRoot;
