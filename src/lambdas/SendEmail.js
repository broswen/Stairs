'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
var SES = new AWS.SES();

module.exports.handler = async event => {

    const key = event.key;
    const emails = event.emails;
    console.log(`Downloading report: ${key}`);

    const params = {
      Bucket: process.env.REPORTSBUCKET,
      Key: key,
    };

    let report;
    try {
      report = await S3.getObject(params).promise();
      console.log('Download complete');

    } catch (error) {
        throw error;
    }
    try {
        await sendEmails(emails, report.Body.toString('utf-8'));
    } catch (error) {
        throw error;   
    }

    return JSON.stringify({
        status: 'OK'
    })

};

async function sendEmails(emails, content) {

    const params = {
        Template: process.env.EMAILTEMPLATE,
        TemplateData: JSON.stringify({content}),
        Destination: {
          BccAddresses: emails,
        },
        Source: process.env.FROMEMAIL
    };

    console.log(JSON.stringify(params));

    const code = await SES.sendTemplatedEmail(params).promise();
    console.log(code);
}