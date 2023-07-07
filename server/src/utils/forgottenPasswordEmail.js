const { sendEmail } = require('./nodemailerSetup');

const forgottenPasswordEmail = async (user, link) => {
  const subject = 'Reset Password Link';
  const text = `<p>${user.name} ${user.surname}, <br> <br>   to reset your password click on the following link: <a href=${link}>Reset Link</a></p>
  <br> <br> <p>Sports Matches Organizer Support</p>`;

  await sendEmail(user.email, subject, text);
};

module.exports.forgottenPasswordEmail = forgottenPasswordEmail;
