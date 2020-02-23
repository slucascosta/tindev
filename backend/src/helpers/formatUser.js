module.exports = {
  formatToReturn(user) {
    let userReturn = {
      _id: user._id,
      user: user.user, 
      bio: user.bio, 
      name: user.name, 
      avatar: user.avatar };
      
    return userReturn;
  }
}