module.exports = {
  async up(db, client) {
    const suppliers = { name: 'Shea Sampson', email: 'kokacicudi@mailinator.com', country: 'IN', mobile_no: '+91878787888', state: 'DH', city: 'Consectetur', zip_code: '933568', address: 'Incidunt necessitat', created_at: new Date(), updated_at: new Date() };

    await db.collection('suppliers').insertOne(suppliers);
    console.log(`Records inserted into the suppliers collection`);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
