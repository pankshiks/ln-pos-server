module.exports = {
  async up(db, client) {
    const roleNamesIds = await db.collection('role_names').find({}, { _id: 1 }).toArray();
    const roleIds = roleNamesIds.map(role => role._id);

    const role_list = [
      { name: 'super_admin', roles: roleIds, status: true, created_at: new Date(), updated_at: new Date() },
      { name: 'admin', roles: roleIds, status: true, created_at: new Date(), updated_at: new Date() }
    ]

    // Insert the record into the units collection
    await db.collection('role_lists').insertMany(role_list);
    console.log('Record inserted into the role_list collection');
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
