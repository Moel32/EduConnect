import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async({email, emailType, userId}:any) =>{
    try {

        // Create a hash token based on the user's ID
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Update the user document in the database with the generated token and expiry time
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
            )
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
            )
        }

        // Create a nodemailer transport
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "401526b3a65a3d",
              pass: "99312202200205"
              //TODO add these to env file
            }
          });

        // Compose email options
              const mailOptions = {
                from: '<your email id>',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
                or Copy and Paste the Link below in your Browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
              }

        // Send the email
              const mailresponse = await transport.sendMail(mailOptions);
              return mailresponse
       
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}