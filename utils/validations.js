const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateName = (name) => {
  const regex = /[\<\>\\\;\:\$\%\^\*\~\[\]\/\,\`\"{\}\(\)\|]/g;

  if (name.match(regex)) return false;
  else {
    return true;
  }
};
const validatePhone = (phone) => {
  const regex = /[\+\(\)\-\ \.\,]/g;
  phone = phone.replace(regex, '');

  if (phone.length == 10) phone = '1' + phone;

  var phoneno = /^\d{11}$/;
  if (phone.match(phoneno)) return true;
  else {
    return false;
  }
};
const validateMessage = (message) => {
  const regex = /[\<\>\\\^\~\[\]\/{\}\(\)\|]/g;

  const newLine = /\n/g;

  if (message.match(regex)) return false;
  else {
    message = message.replace(newLine, '<br/>');
    console.log(message);
    return true;
  }
};

const validations = {
  validateEmail: validateEmail,
  validateName: validateName,
  validatePhone: validatePhone,
  validateMessage: validateMessage,
};

module.exports = validations;
