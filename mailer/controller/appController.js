const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js')
const Mailgen = require('mailgen');

/**send mail from testing account */
const signup = async (req, res) => {
    

    /**testing account */
    let testAccount = await nodemailer.createTestAccount();

    

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

  const {userEmail} = req.body;

  let config = {
    service : 'gmail',
    auth : {
      user: EMAIL,
      pass: PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config)

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js/'
    }
  })


  let response = {
    body: {
      name,
      intro: "your expect has arrived",
      table: {
        data: [
          {
            item: "nodemailer stack book",
            description: "A backend application",
            price: "$11",
          }
        ]
      },
      outro: "do more business"

    }
  }

  let mail = MailGenerator.generate(response)

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "place order",
    html: mail
  }


  transporter.sendMail(message).then(() => {
    
  })

    res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}