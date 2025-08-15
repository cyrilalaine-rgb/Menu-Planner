export type MenuType = "sportif" | "viande" | "poisson" | "vege"

export interface Ingredient {
  name: string
  qtyPerPerson: number // in grams where applicable, or units
  unit: "g" | "ml" | "unité"
}

export interface Recipe {
  id: string
  type: MenuType
  title: string
  caloriesPerPerson?: number
  time: string // prep + cook
  protein?: string
  carbs?: string
  fats?: string
  steps: string[]
  ingredients: Ingredient[]
}

export const RECIPES: Recipe[] = [
  {
    id: "sportif-1",
    type: "sportif",
    title: "Bowl poulet quinoa & brocoli",
    caloriesPerPerson: 650,
    time: "30 min",
    protein: "élevée",
    carbs: "modérée",
    fats: "modérées",
    steps: [
      "Cuire le quinoa (1 vol. quinoa pour 2 vol. eau, 12-15 min).",
      "Saisir le poulet en dés avec épices (paprika, ail).",
      "Blanchir le brocoli 4 min puis passer à la poêle.",
      "Assembler avec huile d’olive et jus de citron."
    ],
    ingredients: [
      { name: "Quinoa", qtyPerPerson: 80, unit: "g" },
      { name: "Poulet (filet)", qtyPerPerson: 150, unit: "g" },
      { name: "Brocoli", qtyPerPerson: 120, unit: "g" },
      { name: "Huile d’olive", qtyPerPerson: 10, unit: "ml" },
      { name: "Citron", qtyPerPerson: 0.25, unit: "unité" }
    ]
  },
  {
    id: "sportif-2",
    type: "sportif",
    title: "Pâtes complètes saumon & épinards",
    caloriesPerPerson: 700,
    time: "25 min",
    protein: "élevée",
    carbs: "élevées",
    fats: "modérées",
    steps: [
      "Cuire les pâtes al dente.",
      "Saisir le saumon en morceaux, ajouter ail et épinards.",
      "Lier avec un peu de yaourt grec ou crème légère."
    ],
    ingredients: [
      { name: "Pâtes complètes", qtyPerPerson: 90, unit: "g" },
      { name: "Saumon", qtyPerPerson: 140, unit: "g" },
      { name: "Épinards", qtyPerPerson: 80, unit: "g" },
      { name: "Yaourt grec", qtyPerPerson: 40, unit: "g" }
    ]
  },
  {
    id: "viande-1",
    type: "viande",
    title: "Poulet rôti express & pommes de terre",
    time: "45 min",
    steps: [
      "Assaisonner le poulet, four à 200°C.",
      "Ajouter pommes de terre en cubes et oignons.",
      "Rôtir 35-40 min en remuant à mi-cuisson."
    ],
    ingredients: [
      { name: "Poulet (cuisses)", qtyPerPerson: 220, unit: "g" },
      { name: "Pommes de terre", qtyPerPerson: 250, unit: "g" },
      { name: "Oignon", qtyPerPerson: 0.3, unit: "unité" }
    ]
  },
  {
    id: "viande-2",
    type: "viande",
    title: "Bœuf sauté poivrons & riz",
    time: "30 min",
    steps: [
      "Cuire le riz.",
      "Saisir les lanières de bœuf, ajouter poivrons et sauce soja.",
      "Servir avec graines de sésame."
    ],
    ingredients: [
      { name: "Riz", qtyPerPerson: 80, unit: "g" },
      { name: "Bœuf (minute)", qtyPerPerson: 150, unit: "g" },
      { name: "Poivron", qtyPerPerson: 0.5, unit: "unité" },
      { name: "Sauce soja", qtyPerPerson: 10, unit: "ml" }
    ]
  },
  {
    id: "poisson-1",
    type: "poisson",
    title: "Cabillaud au four, citron & haricots verts",
    time: "25 min",
    steps: [
      "Four à 200°C. Assaisonner le cabillaud, citron, huile d’olive.",
      "Cuire 12-15 min selon l’épaisseur.",
      "Servir avec haricots verts vapeur."
    ],
    ingredients: [
      { name: "Cabillaud", qtyPerPerson: 160, unit: "g" },
      { name: "Haricots verts", qtyPerPerson: 200, unit: "g" },
      { name: "Citron", qtyPerPerson: 0.25, unit: "unité" },
      { name: "Huile d’olive", qtyPerPerson: 8, unit: "ml" }
    ]
  },
  {
    id: "poisson-2",
    type: "poisson",
    title: "Saumon teriyaki & nouilles",
    time: "20 min",
    steps: [
      "Mélanger sauce teriyaki, miel, gingembre.",
      "Saisir le saumon, glacer avec la sauce.",
      "Cuire nouilles, mélanger avec légumes croquants."
    ],
    ingredients: [
      { name: "Saumon", qtyPerPerson: 150, unit: "g" },
      { name: "Nouilles", qtyPerPerson: 80, unit: "g" },
      { name: "Légumes (carotte, chou)", qtyPerPerson: 100, unit: "g" },
      { name: "Sauce teriyaki", qtyPerPerson: 20, unit: "ml" }
    ]
  },
  {
    id: "vege-1",
    type: "vege",
    title: "Curry de pois chiches & riz basmati",
    time: "30 min",
    steps: [
      "Faire revenir oignon, ail, curry.",
      "Ajouter pois chiches, lait coco, mijoter 15 min.",
      "Servir avec riz basmati."
    ],
    ingredients: [
      { name: "Pois chiches cuits", qtyPerPerson: 120, unit: "g" },
      { name: "Lait de coco", qtyPerPerson: 80, unit: "ml" },
      { name: "Riz basmati", qtyPerPerson: 80, unit: "g" },
      { name: "Oignon", qtyPerPerson: 0.3, unit: "unité" }
    ]
  },
  {
    id: "vege-2",
    type: "vege",
    title: "Dahl de lentilles corail & naan",
    time: "25 min",
    steps: [
      "Rincer lentilles, cuire avec bouillon et épices 15-18 min.",
      "Finition avec lait coco et coriandre."
    ],
    ingredients: [
      { name: "Lentilles corail", qtyPerPerson: 90, unit: "g" },
      { name: "Lait de coco", qtyPerPerson: 60, unit: "ml" },
      { name: "Naan (option)", qtyPerPerson: 0.5, unit: "unité" }
    ]
  }
]
