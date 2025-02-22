import { Category } from "./DAL/Entities/category.entity";
import { Product } from "./DAL/Entities/product.entity";
import { SubCategory } from "./DAL/Entities/subCategory.entity";

const categoriesData = [
  {
    name: "Meyvələr",
    image: "",
    subCategories: [
      {
        name: "Alma",
        products: ["Qırmızı alma", "Yaşıl alma", "Qızıl alma", "Qala alma", "Fudzi alma"]
      },
      {
        name: "Banan",
        products: ["Kanar bananı", "Çips üçün banan", "Orta ölçülü banan", "Filippin bananı", "Latın Amerikası bananı"]
      }
    ]
  },
  {
    name: "Tərəvəzlər",
    image: "",
    subCategories: [
      {
        name: "Pomidor",
        products: ["Çeri pomidor", "Sənaye pomidoru", "İtalyan pomidoru", "Roma pomidoru", "San Marzano"]
      },
      {
        name: "Xiyar",
        products: ["Uzun xiyar", "Gürcü xiyarı", "Mini xiyar", "Turşu xiyarı", "İspanaqlı xiyar"]
      }
    ]
  },
  {
    name: "Süd Məhsulları",
    image: "",
    subCategories: [
      {
        name: "Pendirlər",
        products: ["Ağ pendir", "Feta pendiri", "Gouda", "Parmesan", "Mozzarella"]
      },
      {
        name: "Qatıq",
        products: ["Təbii qatıq", "Az yağlı qatıq", "Vanilli qatıq", "Yunan qatığı", "Probiyotik qatıq"]
      }
    ]
  },
  {
    name: "Ət və Ət Məhsulları",
    image: "",
    subCategories: [
      {
        name: "Mal əti",
        products: ["Dana filesi", "Mal qabırğası", "Biftek", "Qıyma ət", "Hamburger əti"]
      },
      {
        name: "Toyuq",
        products: ["Toyuq döşü", "Toyuq qanadları", "Toyuq budu", "Gril üçün toyuq", "Organic toyuq"]
      }
    ]
  }
];

const generateProducts = () => {
  const products = [];
  for (const category of categoriesData) {
    for (const subCategory of category.subCategories) {
      for (const product of subCategory.products) {
        products.push({
          name: product,
          image: [""],
          category: category.name,
          subCategory: subCategory.name,
          unit: "kg",
          stock: Math.floor(Math.random() * 1000) + 50,
          price: parseFloat((Math.random() * 20 + 1).toFixed(2)),
          discount: Math.random() > 0.7 ? parseFloat((Math.random() * 5).toFixed(2)) : 0,
          description: `Təzə və keyfiyyətli ${product}.`,
          publish: true
        });
      }
    }
  }
  return products;
};

const productsData = generateProducts();

export const seedDatabase = async () => {
  for (const categoryData of categoriesData) {
    const category = new Category();
    category.name = categoryData.name;
    category.image = categoryData.image;
    await category.save();

    for (const subCategoryData of categoryData.subCategories) {
      const subCategory = new SubCategory();
      subCategory.name = subCategoryData.name;
      subCategory.image = "";
      subCategory.category = category;
      await subCategory.save();
    }
  }

  for (const productData of productsData) {
    const category = await Category.findOne({ where: { name: productData.category } });
    const subCategory = await SubCategory.findOne({ where: { name: productData.subCategory } });

    if (!category || !subCategory) {
      console.error(`Kateqoriya və ya Alt Kateqoriya tapılmadı: ${productData.name}`);
      continue;
    }

    const product = new Product();
    product.name = productData.name;
    product.image = productData.image;
    product.unit = productData.unit;
    product.stock = productData.stock;
    product.price = productData.price;
    product.discount = productData.discount;
    product.description = productData.description;
    product.publish = productData.publish;
    product.category = [category];
    product.subCategory = [subCategory];

    await product.save();
  }

  console.log("Böyük miqyaslı məhsul siyahısı ilə verilənlər bazası tamamlandı!");
};
