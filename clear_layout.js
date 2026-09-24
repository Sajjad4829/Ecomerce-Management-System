import mongoose from 'mongoose';

const uri = "mongodb+srv://eccomerce:ABC123@cluster0.z9zoq0y.mongodb.net/furniture-ecommerce?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  await mongoose.connect(uri);
  try {
    const db = mongoose.connection.db;
    const result = await db.collection('libraryconfigurations').updateOne(
      { sectionType: 'SECTION_BUILDER' },
      { $set: { content: { layout: [] } } }
    );
    console.log(`Updated ${result.modifiedCount} documents.`);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
