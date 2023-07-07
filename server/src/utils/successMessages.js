const successMessages = {
  userLoggedIn (user) {
    return `User ${user} logged in successfully!`;
  },
  linkSentToUserMail (email) {
    return `Password reset link sent to ${email}!`;
  },
  passwordUpdated: 'Password successfully updated',
  userDeleted (user) {
    return `${user} deleted!`;
  }
};

module.exports.successMessages = successMessages;
