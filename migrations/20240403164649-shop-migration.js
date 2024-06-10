const fs = require('fs');

module.exports = {
  async up(db, client) {
    // Read the image file as binary data
    const imageBuffer = fs.readFileSync('./assets/logo.jpg');
    const imageBinary = imageBuffer.toString('base64');

    const shops = {name: 'moremall', email: 'moremall@mailinator.com', phone: '+91 6719087987', address: 'test', country: 'IN', vat: '897897DFD', image: Buffer.from(imageBinary, 'base64'), created_at: new Date(), updated_at: new Date()}
    await db.collection('shops').insertOne(shops);
    console.log(`Records inserted into the shop collection`);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
