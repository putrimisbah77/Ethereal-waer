const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "aaliyakhalil2022@gmail.com",
    pass: "vlgvdthbzdpebtwv",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to,subject,text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'etherealwear6@gmail.com', // sender address
    to,
    subject,
    text,
   
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports={sendMail}

