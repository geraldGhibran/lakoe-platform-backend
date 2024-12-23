import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Subcategories = {
  name: string;
  subcategories?: Subcategories[]; 
};

type categories = {
  name: string;
  subcategories?: Subcategories[];
};

const categoriesData: categories[] = [
  {
    "name": "Fashion",
    "subcategories": [
      {
        "name": "Pria",
        "subcategories": [
          { "name": "Baju" },
          { "name": "Celana" },
          { "name": "Sepatu" }
        ]
      },
      {
        "name": "Wanita",
        "subcategories": [
          { "name": "Baju" },
          { "name": "Celana" },
          { "name": "Sepatu" }
        ]
      }
    ]
  },
  {
    "name": "Elektronik",
    "subcategories": [
      {
        "name": "Handphone",
        "subcategories": [
          { "name": "Smartphone" },
          { "name": "Aksesoris" },
          { "name": "Smartwatch" }
        ]
      },
      {
        "name": "Laptop",
        "subcategories": [
          { "name": "Gaming" },
          { "name": "Ultrabook" },
          { "name": "2-in-1" }
        ]
      }
    ]
  },
  {
    "name": "Peralatan Rumah Tangga",
    "subcategories": [
      {
        "name": "Furniture",
        "subcategories": [
          { "name": "Kursi" },
          { "name": "Meja" },
          { "name": "Lemari" }
        ]
      },
      {
        "name": "Peralatan Dapur",
        "subcategories": [
          { "name": "Alat Masak" },
          { "name": "Peralatan Makan" },
          { "name": "Blender" }
        ]
      },
      {
        "name": "Pencahayaan",
        "subcategories": [
          { "name": "Lampu Meja" },
          { "name": "Lampu Gantung" },
          { "name": "Lampu Dinding" }
        ]
      }
    ]
  },
  {
    "name": "Makanan & Minuman",
    "subcategories": [
      {
        "name": "Makanan",
        "subcategories": [
          { "name": "Makanan Ringan" },
          { "name": "Makanan Beku" },
          { "name": "Cemilan" }
        ]
      },
      {
        "name": "Minuman",
        "subcategories": [
          { "name": "Minuman Dingin" },
          { "name": "Minuman Panas" },
          { "name": "Alkohol" }
        ]
      }
    ]
  },
  {
    "name": "Kesehatan & Kecantikan",
    "subcategories": [
      {
        "name": "Perawatan Kulit",
        "subcategories": [
          { "name": "Pelembab" },
          { "name": "Sunscreen" },
          { "name": "Serum" }
        ]
      },
      {
        "name": "Makeup",
        "subcategories": [
          { "name": "Lipstik" },
          { "name": "Maskara" },
          { "name": "Foundation" }
        ]
      },
      {
        "name": "Perawatan Rambut",
        "subcategories": [
          { "name": "Shampoo" },
          { "name": "Conditioner" },
          { "name": "Hair Oil" }
        ]
      }
    ]
  },
  {
    "name": "Olahraga & Outdoor",
    "subcategories": [
      {
        "name": "Peralatan Olahraga",
        "subcategories": [
          { "name": "Sepakbola" },
          { "name": "Basket" },
          { "name": "Golf" }
        ]
      },
      {
        "name": "Peralatan Camping",
        "subcategories": [
          { "name": "Tenda" },
          { "name": "Sleeping Bag" },
          { "name": "Lampu Camping" }
        ]
      },
      {
        "name": "Sepatu Olahraga",
        "subcategories": [
          { "name": "Sepatu Lari" },
          { "name": "Sepatu Bola" },
          { "name": "Sepatu Hiking" }
        ]
      }
    ]
  }
]

const createcategoriesWithSubcategories = async (categories: categories, parentId: number | null = null) => {
  const createdcategories = await prisma.categories.create({
    data: {
      name: categories.name,
      parentId: parentId,
      subcategories: {
        create: categories.subcategories
          ? categories.subcategories.map((subcat) => ({
              name: subcat.name,
              subcategories: {
                create: subcat.subcategories
                  ? subcat.subcategories.map((subsubcat) => ({
                      name: subsubcat.name,
                    }))
                  : [],
              },
            }))
          : [],
      },
    },
  });
  return createdcategories;
};

const seedCategories = async () => {
  console.log('Seeding categories...');
  for (const categories of categoriesData) {
    await createcategoriesWithSubcategories(categories);
  }
  console.log('Categories seeded successfully!');
};

seedCategories()
  .catch((error) => {
    console.error('Error seeding categories:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
