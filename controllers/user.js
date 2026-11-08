import User from "../models/User.js";

//GET METHOD
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json(users);
};

//POST METHOD
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  const saved = await newUser.save();
  res.status(201).json({
    id: saved._id,
    name: saved.name,
    email: saved.email,
    role: saved.role,
  });
};

//PUT METHOD
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, {
      new: true,
      runValidators: true,
      select: "-password",
    });
    if (!updatedUser) {
      return res.status(404).send("User not found/lama soo helin chp");
    }
    res.json(updatedUser);
    //catch error
  } catch (error) {
    res.status(500).send("Server error/Celidu wxy ka jirta server-ka wree");
  }
};

//DELETE METHOD
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  //try & catch
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!this.deleteUser) {
      return res.status(404).send("User not found/lama soo helin chp userkazz");
    }
    res.json(deletedUser);
  } catch (error) {
    //catch error
    res.status(500).send("Server error/Celidu wxy ka jirta server-ka wree");
  }
};

//find a user
export const findUser = async (req, res) => {};

// exports.getUserInfo = (req, res) => {
//   const user = users.find((u) => u.id === Number(req.params.id));
//   if (!user) return res.status(404).send("User not found");

//   res.json(user);
// };
