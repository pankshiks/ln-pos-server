module.exports = {
  async up(db, client) {
    const units = [
      { name: 'ltr', created_at: new Date(), updated_at: new Date() },
      { name: 'kg', created_at: new Date(), updated_at: new Date() },
      { name: 'pc', created_at: new Date(), updated_at: new Date() },
    ];
    await db.collection('units').insertMany(units);
    console.log(`${units.length} records inserted into the units collection`);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
