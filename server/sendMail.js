const { sendEmail } = require('./src/utils/nodemailerSetup');

async function bla () {
    const subject = 'Reset Password Link';
    const text = `<p>${'VUKI'} ${'Sljuki'}, <br> <br>   to reset your password click on the following link: <a href=${'link'}>Reset Link</a></p>
      <br> <br> <p>Sports Matches Organizer Support</p>`;

    await sendEmail('vuksan@Mail.com', subject, text);
};

bla();
