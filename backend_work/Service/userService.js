// const {event,Users} = require("../Models/schema/");

const { Users, Events } = require("../Models/schema");

const getAllUsersData = (count) => {
  return Users.find().skip(count).limit(11);
};

const getAllImageData = () => {
  return Users.find({
    filesPath: {
      $regex: ".(jpg|jpeg|png|gif|webp)$",
      $options: "i",
    },
  });
};

const getUserData = async (uid) => {
  return await Users.findOne({ _id: uid });
};

const createUserData = async (hostPath, originalname) => {
  const id = Math.floor(10000 + (Math.random() * 9000))
  const newUser = new Users({
    uid: id,
    filesPath: hostPath,
    fileName: originalname,
    way: "uploaded"
  });
  return await newUser.save();
};

const updateUserData = async (uid, inputData) => {
  return await Users.findOneAndUpdate({ _id: uid }, inputData, {
    new: true,
  });
};

const deleteUserData = async (uid) => {
  return await Users.findOneAndDelete({ _id: uid });
};


const generatedUserData = async (hostPath, originalname) => {
  const id = Math.floor(10000 + (Math.random() * 9000))
  const newUser = new Users({
    uid: id,
    filesPath: hostPath,
    fileName: originalname,
    way: "generated"
  });
  return await newUser.save();
}

const getGeneratedEventData=() => {
  return Users.find({
    way: "generated",
  });
};

module.exports = {
  getAllUsersData,
  getAllImageData,
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  generatedUserData,
  getGeneratedEventData
};
