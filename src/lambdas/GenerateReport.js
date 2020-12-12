'use strict';
const KSUID = require('ksuid');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
module.exports.handler = async event => {

    console.log(event);
    const now = event.now;
    const emails = event.emails;
    console.log("Generating report");

    const id = await KSUID.random();

    // "download data and generate report"
    const contents = `
        ID: ${id.string} <br />
        Date: ${now}<br />
        ####################<br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mauris, venenatis ac posuere vel, iaculis vel enim.<br />
        Suspendisse venenatis ligula eget lacinia pharetra. Nullam tristique elementum diam finibus sagittis. Duis vulputate, ex vel tristique vestibulum,<br />
        felis nisi dapibus turpis, in luctus mauris nisl in risus.<br />
        Praesent hendrerit urna enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec finibus lacus nec pretium convallis.<br />
        Aliquam sed odio elit. Morbi feugiat neque eu consectetur maximus. Nam quis massa hendrerit, egestas lacus in, suscipit lacus.<br />
        Curabitur elit mauris, semper pulvinar pulvinar non, fringilla sit amet arcu.<br />
        <br />
        Fin.
    `;

    console.log("Report complete");

    const key = `${now}-${id.string}.txt`;

    const params = {
        Body: Buffer.from(contents),
        Bucket: process.env.REPORTSBUCKET,
        Key: key
    }
    
    console.log("Uploading report");

    try {
        const response = await S3.putObject(params).promise();
        console.log(`Upload complete: ${key}`);
    } catch (error) {
        throw error;
    }

    return {
      key,
      emails
    };
};
