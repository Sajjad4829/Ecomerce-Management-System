import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './lib/db.js';
import Category from './lib/models/Category.js';
import Product from './lib/models/Product.js';
import MediaAsset from './lib/models/MediaAsset.js';

async function check() {
  await connectDB();
  
  const cats = await Category.find({}).lean();
  let catSize = JSON.stringify(cats).length;
  console.log(`Categories total size: ${(catSize / 1024 / 1024).toFixed(2)} MB`);

  const prods = await Product.find({}).lean();
  let prodSize = JSON.stringify(prods).length;
  console.log(`Products total size: ${(prodSize / 1024 / 1024).toFixed(2)} MB`);

  const media = await MediaAsset.find({}).lean();
  let mediaSize = JSON.stringify(media).length;
  console.log(`MediaAssets total size: ${(mediaSize / 1024 / 1024).toFixed(2)} MB`);

  process.exit(0);
}

check();
