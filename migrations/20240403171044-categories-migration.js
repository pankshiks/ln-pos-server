module.exports = {
  async up(db, client) {

    const categories = { name: 'clothes', created_at: new Date(), updated_at: new Date() };

    // Insert the record into the categories collection
    await db.collection('categories').insertOne(categories);
    console.log('Record inserted into the categories collection');
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
