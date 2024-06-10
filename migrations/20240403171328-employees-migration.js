const fs = require('fs');
const bcrypt = require('bcrypt')

module.exports = {
  async up(db, client) {
    // Read the image file as binary data
    const imageBuffer = fs.readFileSync('./assets/avatar.png');
    const imageBinary = imageBuffer.toString('base64');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt);

    // Get RoleId of super_admin role
    const role = await db.collection('role_lists').findOne({ name: 'super_admin' })

    const employees = [
      { first_name: 'droon', last_name: 'user', image: Buffer.from(imageBinary, 'base64'), role_id: role._id, phone_no: '+91830698740', email: 'droon99@yopmail.com', password: hashedPassword, created_at: new Date(), updated_at: new Date() },
      { first_name: 'admin', last_name: 'user', image: Buffer.from(imageBinary, 'base64'), role_id: role._id, phone_no: '+91830698740', email: 'admin99@yopmail.com', password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    ];

    // Insert the record into the employees collection
    await db.collection('employees').insertMany(employees);
    console.log('Record inserted into the employees collection', hashedPassword);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
