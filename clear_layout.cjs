const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://eccomerce:ABC123@cluster0.z9zoq0y.mongodb.net/furniture-ecommerce?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('furniture-ecommerce');
    const result = await db.collection('libraryConfigurations').updateOne(
      { sectionType: 'SECTION_BUILDER' },
      { $set: { content: { layout: [] } } }
    );
    console.log(`Updated ${result.modifiedCount} documents.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
