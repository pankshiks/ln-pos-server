module.exports = {
  async up(db, client) {
    const role_names = [
      { name: 'setting section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'dashboard section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'employee section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'pos section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'product section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'customer section', active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'supplier section', active: true, created_at: new Date(), updated_at: new Date() },
    ];
    await db.collection('role_names').insertMany(role_names);
    console.log(`${role_names.length} records inserted into the role_names collection`);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
