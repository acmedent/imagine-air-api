// library imports
const Boom = require('boom');

const validations = require('../../utils/validations');
const Email = require('../../utils/email');

const route = {
  method: 'POST',
  path: '/email/send',
  options: { auth: false, cors: { origin: ['*'] } },
  handler: async (req, res) => {
    // console.log(req.payload)
    try {
      const { email, name, company, phone, subject, message } = req.payload;

      let errMsgs = [];
      let valid = true;

      const validStatus = [
        {
          status: validations.validateEmail(email),
          errMsg: 'Invalid Email.',
        },
        {
          status: validations.validateName(name),
          errMsg: 'Invalid Name. Please avoid using special characters.',
        },
        {
          status: validations.validateName(company),
          errMsg:
            'Invalid Company Name. Please avoid using special characters.',
        },
        {
          status: validations.validatePhone(phone),
          errMsg: 'Invalid Phone Number.',
        },
        {
          status: validations.validateMessage(subject),
          errMsg:
            'Invalid Subject Content. Please avoid using special characters.',
        },
        {
          status: validations.validateMessage(message),
          errMsg:
            'Invalid Message Content. Please avoid using special characters.',
        },
      ];

      // let emailStatus = validations.validateEmail(email)

      validStatus.map((validation) => {
        if (!validation.status) {
          valid = false;
          errMsgs.push(validation.errMsg);
        }
      });

      if (valid) {
        //send email
        Email.sendEmail({ email, name, company, phone, subject, message });

        // response
        return res
          .response({
            validationStatus: valid,
          })
          .code(201);
      } else {
        return res
          .response({
            validationStatus: valid,
            errMsgs: errMsgs,
          })
          .code(201);
      }
    } catch (error) {
      // error
      return Boom.badRequest(error);
    }
  },
};

exports.route = route;
