const fs = require('fs');

module.exports = {
  async up(db, client) {
    // Read the image file as binary data
    const imageBuffer = fs.readFileSync('./assets/gucci.jpg');
    const imageBinary = imageBuffer.toString('base64');

    const brands = { name: 'gucci', image: Buffer.from(imageBinary, 'base64'), created_at: new Date(), updated_at: new Date() };

    // Insert the record into the brands collection
    await db.collection('brands').insertOne(brands);
    console.log('Record inserted into the brands collection');
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
