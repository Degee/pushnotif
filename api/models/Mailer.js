import nodemailer from 'nodemailer';

const config = {
  service: 'gmail',
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'pushnotif.fit@gmail.com',
    pass: 'pushnotif123'
  }
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(config);

// setup email data with unicode symbols
const mailOptions = ({to, subject, text, html}) => {
    return {
      from: `"Push notification server" <${config.auth.user}>`, // sender address
      to: to,
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // html body
    }
};

// send mail with defined transport object
const sendMail = (options, cb) => {
  if (process.env.NODE_ENV == 'test') {
    return cb(null, {message: 'hurray xD'});
  } else {
    transporter.sendMail(mailOptions(options), (error, info) => {
      if (error) {
        return cb(error);
      }
      return cb(null, info);
    });
  }

};

export default sendMail;