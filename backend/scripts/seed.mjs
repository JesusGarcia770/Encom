import mongoose from "mongoose"
import categoriesModel from "../src/Models/categories.js"
import productsModel from "../src/Models/products.js"

await mongoose.connect("mongodb://localhost:27017/EncomDB")

const categoriesData = [
  { name: "Smartphones", description: "Teléfonos inteligentes", status: "Activo" },
  { name: "Tablets", description: "Tablets y dispositivos táctiles", status: "Activo" },
  { name: "Laptops", description: "Laptops y notebooks", status: "Activo" },
  { name: "Monitores", description: "Monitores y pantallas", status: "Activo" },
]

const categories = {}
for (const data of categoriesData) {
  const category = await categoriesModel.findOneAndUpdate(
    { name: data.name },
    data,
    { upsert: true, returnDocument: 'after' }
  )
  categories[data.name] = category._id
}

const productsData = [
  {
    name: "Aether Pro 250GB",
    description: '6.7" AMOLED · 200MP · 5000mAh',
    category: "Smartphones",
    price: 740,
    stock: 12,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    name: "Aether Lite 128GB",
    description: '6.4" LCD · 64MP · 4500mAh',
    category: "Smartphones",
    price: 499,
    stock: 20,
    image: "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?w=600",
  },
  {
    name: "Aether Pro Max",
    description: '6.8" AMOLED · 108MP · 6000mAh',
    category: "Smartphones",
    price: 899,
    stock: 8,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
  },
  {
    name: "Aether SE",
    description: '6.1" LCD · 48MP · 4000mAh',
    category: "Smartphones",
    price: 299,
    stock: 25,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600",
  },
  {
    name: "Aether Tab Pro",
    description: '11" AMOLED · S-Pen · 8000mAh',
    category: "Tablets",
    price: 580,
    stock: 10,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600",
  },
  {
    name: "Aether Tab Lite",
    description: '8" LCD · 4GB RAM · 5100mAh',
    category: "Tablets",
    price: 199,
    stock: 15,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600",
  },
  {
    name: "Aether Tab S",
    description: '10.5" IPS · 8GB RAM · 7000mAh',
    category: "Tablets",
    price: 380,
    stock: 9,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600",
  },
  {
    name: "Encom Book Pro",
    description: '15.6" OLED · i7 · 16GB · 512GB SSD',
    category: "Laptops",
    price: 1099,
    stock: 6,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
  },
  {
    name: "Encom Book Air",
    description: '13.3" IPS · i5 · 8GB · 256GB SSD',
    category: "Laptops",
    price: 699,
    stock: 14,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600",
  },
  {
    name: "Encom Book Lite",
    description: '14" IPS · Ryzen 5 · 8GB · 256GB',
    category: "Laptops",
    price: 549,
    stock: 11,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
  },
  {
    name: 'Encom View 27"',
    description: "4K IPS · 144Hz · HDR400",
    category: "Monitores",
    price: 320,
    stock: 7,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
  },
  {
    name: 'Encom View 24"',
    description: "FHD IPS · 75Hz · Ultra delgado",
    category: "Monitores",
    price: 210,
    stock: 13,
    image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=600",
  },
]

for (const data of productsData) {
  await productsModel.findOneAndUpdate(
    { name: data.name },
    {
      name: data.name,
      description: data.description,
      category_id: categories[data.category],
      price: data.price,
      stock: data.stock,
      image: data.image,
      public_id: `seed/${data.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { upsert: true, returnDocument: 'after' }
  )
}

console.log(`Seed listo: ${productsData.length} productos en ${categoriesData.length} categorías.`)
await mongoose.disconnect()
