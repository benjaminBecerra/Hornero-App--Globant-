const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'horneroapp123@gmail.com',
      pass: 'fxymntnolnovympp'
    }
})

// transporter.verify((err, success) => {
//     if (err) console.error(err);
//     else console.log('Mail config is correct');
// });

const replyButton = `<a href="http://localhost:3000/profile" style="margin:20px; text-decoration:none; font-family: sans-serif; font-size:14px; font-weight:700; color:black; background-color:#bfd732; border:none; border-radius:1000px; padding:10px 25px"> Responder </a>`

const emailBodyFooter = `<p style="padding-top:30px; color:gray; font-family:sans-serif"> Este es un mensaje automatico. Por favor, no responder. </p><p style="color:gray"><img style="height:30px" src='https://png.vector.me/files/images/1/0/103781/simple_tree_clip_art.jpg' /> Pensa si es realmente necesario antes de imprimir este mail</p><p style="color:gray"> Otras infos legales... </p>`

const sendMailToFriend = (mail) => {
    const mailOptions = {
        from: `"HorneroApp" <horneroapp123@gmail.com>`,
        to: mail.to,
        subject: `${mail.from} te quiere decir algo desde HorneroApp`,
        html:  `<div style="font-size:18px; margin-bottom:20px; font-family:sans-serif"> ${mail.body} </div> 
        ${replyButton} ${emailBodyFooter}`
    }

    transporter.sendMail(mailOptions , function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = { sendMailToFriend }