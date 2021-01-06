const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (data) => {
  try {
    console.log(data);

    const msg = {
      to: 'rgarbulha@imagineairsystems.com',
      from: 'info@imagineairsystems.com', // Use the email address or domain you verified above
      reply_to: data.email,
      subject: data.subject,
      text: data.message + data.name + data.company + data.phone,
      html:
        '<p>' +
        data.message.replace('\n', '<br/>') +
        '</p><br/><br/><p><b>Name: ' +
        data.name +
        '<br/>Company: ' +
        data.company +
        '</b><br/>Phone: ' +
        data.phone +
        '</p>',
    };
    //ES6
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );

    return true;
  } catch {
    return false;
  }
};

module.exports = { sendEmail: sendEmail };
