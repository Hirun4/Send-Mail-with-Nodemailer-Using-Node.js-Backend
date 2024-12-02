const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js')

/**send mail from testing account */
const signup = async (req, res) => {
    

    /**testing account */
    let testAccount = await nodemailer.createTestAccount();

    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      let message = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }

    transporter.sendMail( message ).then((info) => {
        return res.status(201)
        .json({ 
          msg: "you should receive an email",
          info : info.messageId,
          preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

   // res.status(201).json("Signup Successfully...!");
}

/**send mail from real gmail account */
const getbill = (req,res) => {

  let config = {
    service : 'gmail',
    auth : {
      user: EMAIL,
      pass: PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config)


    res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}