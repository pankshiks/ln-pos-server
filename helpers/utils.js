const puppeteer = require('puppeteer');
const path = require("path");
const fs = require('fs')
const nodemailer = require('nodemailer');


const calculateOrderDeatils = (products) => {
    let order_amount = 0, total_tax = 0, discount = 0, product=[]
    products.forEach((item) => {
        order_amount += item.selling_price * item.qtn;
        total_tax += item.tax * item.qtn;
        discount += item.discount * item.qtn;
        product.push(item._id)
    });
    return {
        order_amount: order_amount.toFixed(2), 
        total_tax: total_tax.toFixed(2), 
        discount: discount.toFixed(2),
        paid_amount: ( parseFloat(order_amount)+parseFloat(total_tax)-parseFloat(discount) ).toFixed(2),
        product
    }
};

const invoiceHtml = (data, invoice) => {
   console.log(invoice);
    return html = `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="utf-8">
          <title>Invoice</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
       </head>
       <body>
      <div style="width: 100%;">
         <div style="display: flex; justify-content: center;">
            <div style="background: #ffffff none repeat scroll 0 0; border-bottom: 12px solid #333333; border-top: 12px solid #9f181c; margin-top: 50px; margin-bottom: 50px; padding: 40px 30px !important; position: relative; box-shadow: 0 1px 21px #acacac; color: #333333; font-family: open sans; width: 66.66666667%; ">
               <div style="display: flex;">
                  <div style="width: 50%;">
                     <div style="text-align: left;">
                        <img class="img-responsive" alt="iamgurdeeposahan" src=${process.env.BASE_URL+'logo.jpeg'} style="width: 71px; border-radius: 43px;">
                     </div>
                  </div>
                  <div style="width: 50%; text-align: right;">
                     <div>
                        <h5>${process.env.COMPANY_NAME}</h5>
                        <p>${process.env.COMPANY_MOBILE} <i class="fa fa-phone"></i></p>
                        <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="ceada1a3beafa0b78ea9a3afa7a2e0ada1a3">${process.env.COMPANY_EMAIL}</a> <i class="fa fa-envelope-o"></i></p>
                        <p>${process.env.COMPANY_LOCATION} <i class="fa fa-location-arrow"></i></p>
                     </div>
                  </div>
               </div>
               <div style="margin: 24px 0; overflow: hidden; display: flex;">
                  <div style="width: 66.66666667%; text-align: left;">
                     <div>
                        <h5>${data?.customer?.name}</h5>
                        <p><b>Mobile :</b> ${data?.customer?.mobile_no}</p>
                        <p><b>Email :</b> <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="abc8ded8dfc4c6ced9ebccc6cac2c785c8c4c6">${data?.customer?.email}</a></p>
                     </div>
                  </div>
                  <div style="width: 33.33333333%;">
                     <div style="text-align: left;">
                        <h4>INVOICE: ${invoice}</h4>
                     </div>
                  </div>
               </div>
               <div>
                  <table style="width: 100%; border-collapse: collapse; border-spacing: 0; border: 1px solid">
                     <thead style="background: #414143 none repeat scroll 0 0; border: 1px solid">
                        <tr>
                           <th style="padding: 13px 20px !important; color: #fff;"></th>
                           <th style="padding: 13px 20px !important; color: #fff;">Description</th>
                           <th style="padding: 13px 20px !important; color: #fff;">Quantity</th>
                           <th style="padding: 13px 20px !important; color: #fff;">Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        ${data.products.map((item, index) => (
                           `<tr>
                              <td style="padding: 9px 20px !important; font-size: 13px; font-weight: initial !important;">${index+1}</td>
                              <td style="padding: 9px 20px !important; font-size: 13px; font-weight: initial !important;">${item.description}</td>
                              <td style="padding: 9px 20px !important; font-size: 13px; font-weight: initial !important;">${item.qtn}</td>
                              <td style="padding: 9px 20px !important; font-size: 13px; font-weight: initial !important;"><i class="fa fa-inr"></i> ${item.selling_price}</td>
                           </tr>`
                        ))}
                     </tbody>
                     <tfoot>
                        <tr>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: right;">Sub Total:</th>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: center;">${calculateOrderDeatils(data.products).order_amount}</th>
                        </tr>
                        <tr>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: right;">20% VAT:</th>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: center;">${calculateOrderDeatils(data.products).total_tax}</th>
                        </tr>
                        <tr>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: right;">Credit:</th>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: center;">${calculateOrderDeatils(data.products).discount}</th>
                        </tr>
                        <tr>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: right;">Total:</th>
                           <th colspan="2" style="padding: 13px 20px !important; text-align: center;">${calculateOrderDeatils(data.products).paid_amount}</th>
                        </tr>
                     </tfoot>
                  </table>
               </div>
               <div style="margin: 24px 0; overflow: hidden;">
                  <div style="width: 66.66666667%; text-align: left;">
                     <div>
                        <p><b>Date :</b> ${new Date().toLocaleDateString()}</p>
                        <h5 style="color: rgb(140, 140, 140);">Thanks for shopping.!</h5>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </body>
    </html>`
}

const generatePDF = async({ customer, products, filename, invoice}) => {
   try {
      // Launch a new chrome instance
      const browser = await puppeteer.launch({
         headless: true
      });

      // Create a new page
      const page = await browser.newPage();

      // Set your HTML as the page's content
      const html = invoiceHtml({ customer, products }, invoice);
      await page.setContent(html, {
         waitUntil: 'domcontentloaded'
      });

      // Create a PDF buffer
      const pdfBuffer = await page.pdf({
         format: 'A4'
      });

      await browser.close();

      return pdfBuffer;

   } catch (error) {
      return false;
   }
}

const sendEmail = async({ to, subject, filename, invoice, customer, date}) => {
   const transporter = await nodemailer.createTransport({
      service: "Gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'nikita.lnwebworks@gmail.com',
        pass: 'aejd bxqc sgos kwrp',
      }
   });
    
   const mailOptions = {
      from: 'nikita.lnwebworks@gmail.com',
      to: to,
      subject: subject,
      html: `
      <div style="background: #ffffff none repeat scroll 0 0;  margin-top: 50px; margin-bottom: 50px; padding: 40px 30px !important; position: relative; color: #333333; font-family: open sans; width: 66.66666667%; font-family: Arial, sans-serif; line-height: 1.6; width: 60%">
         <p style="font-size: 16px;">Dear ${customer.name},</p>
         <p style="font-size: 16px;">I hope you are well. Attached is invoice number ${filename}, which is due on ${new Date(date).toLocaleDateString()}.</p>
         <p style="font-size: 16px;">If you have any questions, please feel free to reach out.</p>

         <br/><br/>
         <p style="font-size: 16px;">Kind regards,</p>
         <p style="font-size: 16px;">${process.env.COMPANY_NAME}</p>
         <p style="font-size: 16px;">${process.env.COMPANY_EMAIL}</p>
         <p style="font-size: 16px;">${process.env.COMPANY_MOBILE}</p>
         <p style="font-size: 16px;">${process.env.COMPANY_LOCATION}</p>
      </div>
   `,
      attachments: [
         {
            filename: `${filename}.pdf`,
            content: invoice,
            contentType: 'application/pdf'
         }
      ]
   }
   try {
         const info = await transporter.sendMail(mailOptions);
         console.log('Email sent:', info.response);
         return info;
   } catch (error) {
         console.error('Error sending email:', error);
         return { error: 'Error sending email', details: error };
   }
}

const getFacebookToken = () => {
   try {
      
   } catch (error) {
      
   }
}

const sendPhone = async({ pdfBuffer, fileName, to}) => {

   const mediaId = uploadMedia(pdfBuffer, fileName)
   const messageData = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'document',
      document: {
          id: mediaId,
          caption: 'Here is your invoice'
      }
  };

  try {
      const response = await axios.post(`${process.env.FACEBOOK_URL}${process.env.FACEBOOK_PHONENO_ID}/messages`, messageData, {
          headers: {
              'Authorization': `Bearer ${getFacebookToken()}`,
              'Content-Type': 'application/json'
          }
      });
      console.log('Message sent:', response.data);
  } catch (error) {
      console.error('Error sending message:', error.response.data);
      throw error;
  }
}

const uploadMedia = async ({ pdfBuffer, fileName }) => {
   const formData = new FormData();
   formData.append('file', pdfBuffer, { filename: `${fileName}.pdf`, contentType: 'application/pdf' });
   formData.append('messaging_product', 'whatsapp');
   formData.append('type', 'document');

   try {
       const response = await axios.post(`${process.env.FACEBOOK_URL}${process.env.FACEBOOK_PHONENO_ID}/media`, formData, {
           headers: {
               'Authorization': `Bearer ${getFacebookToken()}`,
               ...formData.getHeaders()
           }
       });
       return response.data.id; // Return the media ID
   } catch (error) {
       console.error('Error uploading media:', error.response.data);
       return error;
   }
};

module.exports = { calculateOrderDeatils, invoiceHtml, generatePDF, sendEmail, sendPhone }