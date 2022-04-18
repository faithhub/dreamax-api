import nodemailer from 'nodemailer';


const emailSmtpConfig = () => {
    return {
        transportConfig: () => {
            const transport = {
                //this is the authentication for sending email.
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use TLS
            //create a .env file and define the process.env variables with your credentials.
            auth: {
                user: process.env.SMTP_TO_EMAIL,
                pass: process.env.SMTP_TO_PASSWORD,
            },
            }
5
            const transporter = nodemailer.createTransport(transport)

            transporter.verify((err, success) => {
                if (err) {
                    console.log(err)
                }
                console.log('Ready To Send Mail')
            });

            transporter.sendMail()

        }
    }
}