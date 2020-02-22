const axios = require('axios');
const Dev = require('../models/Devs');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users.map(x => returnUser(x)));
  },
  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists)
      return res.json(returnUser(userExists));

    const response = await axios.get(`https://api.github.com/users/${ username }`);

    const { name, bio, avatar_url: avatar } = response.data;

    var dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });
    
    return res.json(returnUser(dev));
  },
  async byId(req, res) {
    const { id } = req.params;

    const devs = await Dev.find({
      _id: { $eq: id }
    });

    return res.json(devs.length && { _id: dev[0]._id, user: dev[0].user });
  }
};

function returnUser(user) {
  let userReturn = {
    _id: user._id,
    user: user.user, 
    bio: user.bio, 
    name: user.name, 
    avatar: user.avatar };
    
  return userReturn;
}