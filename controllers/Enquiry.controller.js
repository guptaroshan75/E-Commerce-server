const EnquiryModel = require('../model/EnquiryDetails.model');
const nodemailer = require("nodemailer");

const addEnquiryDetails = async (req, res) => {
    try {
        const { email, message, number, name } = req.body;
        const newEnquir = await EnquiryModel.create({
            email, message, number, name
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: 'Regarding Car Auto Parts',
            html:
                `<div>
                    <p> <b> Get Quote </b> </p>
                    <p>
                        A new inquiry has been submitted through our website.
                        Please find below the details provided by the user
                    </p>
                    <table role="presentation"
                        style="width: 600px; border-color: #000000; border: 1px solid #ffffff;
                       border-collapse: collapse" border="1"
                    >
                        <tbody>
                            <tr>
                                <th colspan="2"
                                    style="background: #c39034; color: #ffffff; line-height: 6px;
                                font-weight: bold"
                                >
                                    <p> functions </p>
                                </th>
                            </tr>
                            <tr style="background:#eeeeee">
                                <th style="padding:0px 12px; text-align: right; line-height: 1">
                                    <p>Name:</p>
                                </th>
                                <td style="padding: 0px 12px; text-align: left; line-height: 1">
                                    <p>${name}</p>
                                </td>
                            </tr>
                            <tr style="background:#eeeeee">
                                <th style="padding: 0px 12px; text-align: right; line-height: 1">
                                    <p> Email-Id: </p>
                                </th>
                                <td style="padding: 0px 12px; text-align: left; line-height: 1">
                                    <p>
                                        <a href="mailto:${email}" target="_blank"> ${email} </a>
                                    </p>
                                </td>
                            </tr>
                            <tr style="background:#eeeeee">
                                <th style="padding: 0px 12px; text-align: right; 
                                line-height: 1; height: 16px"
                                >
                                    <p> Mobile Number : </p>
                                </th>
                                <td style="padding:0px 12px;text-align:left;line-height:1">
                                    <p> ${number} </p>
                                </td>
                            </tr>
                            <tr style="background:#eeeeee">
                                <th style="padding: 0px 12px; text-align: right; line-height: 1">
                                    <p> Message </p>
                                </th>
                                <td style="padding: 0px 12px; text-align: left; line-height: 1">
                                    <p>  ${message} </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Thank you for your attention to this matter.</p>
                    <p>Best regards,</p>
                    <p>  ${name} </p>
                </div>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                res.status(201).json({
                    status: Success,
                    data: info,
                    data: newEnquir
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message
        })
    }
}

module.exports = { addEnquiryDetails }