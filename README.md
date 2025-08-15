# Menu Planner (soir)

Application Next.js (TypeScript) pour générer des menus du soir en fonction d'un **type** (sportif, viande, poisson, végé) et du **nombre de personnes**. UI : Tailwind CSS + shadcn/ui, Radix Themes, icônes Lucide/Heroicons, animations Framer Motion.

## Démarrage

```bash
# avec pnpm (recommandé) ou npm/yarn
pnpm install
pnpm dev
# puis http://localhost:3000
```

## Stack

- Next.js 14 (App Router, TS)
- Tailwind CSS + tailwindcss-animate
- shadcn/ui (bouton, carte, input, select minimal)
- Radix Themes (provider, styles)
- Framer Motion (animations)
- lucide-react et @heroicons/react (icônes)

## Personnalisation

- Ajoutez vos recettes dans `components/menu-data.ts` (quantités par personne).
- Les quantités sont multipliées automatiquement selon le nombre de convives.
- Boutons **Copier la liste** et **Imprimer** pour partager/archiver.

## Licence

MIT
