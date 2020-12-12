'use strict';

module.exports.handler = async event => {

  const emails = event.emails;
  console.log(event);
  const now = new Date();
  console.log("Verifying parameters");
  console.log(now.toISOString());

  if(emails.length < 1) throw new Error("no emails specified.");

  emails.forEach(email => {
    // also add regex to check email format
    if(!email.endsWith("@gmail.com")) throw new Error("only sending to @gmail.com addresses");
  });

  return {
    now: now.toISOString(),
    emails
  };
};
