"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, ShoppingBag, RefreshCw, Printer, Copy, Users, Moon, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MenuType, Recipe } from "./menu-data"
import { RECIPES } from "./menu-data"

type Generated = {
  recipe: Recipe
  people: number
  ingredientsScaled: { name: string; qty: number; unit: string }[]
}

const MENU_TYPES: { value: MenuType; label: string }[] = [
  { value: "sportif", label: "Sportif" },
  { value: "viande", label: "Viande" },
  { value: "poisson", label: "Poisson" },
  { value: "vege", label: "Végé" }
]

function formatQty(qty: number) {
  // round to 1 decimal for small numbers, nearest 5g for large
  if (qty < 1) return qty.toFixed(1).replace(".", ",")
  if (qty < 50) return String(Math.round(qty))
  return String(Math.round(qty / 5) * 5)
}

function makeShoppingText(gen: Generated) {
  const lines = gen.ingredientsScaled.map(i => `- ${i.name}: ${formatQty(i.qty)} ${i.unit}`).join("\n")
  return `Menu: ${gen.recipe.title} (pour ${gen.people} personnes)\n\nIngrédients:\n${lines}`
}

export default function MenuGenerator() {
  const [menuType, setMenuType] = useState<MenuType>("sportif")
  const [people, setPeople] = useState<number>(2)
  const [generated, setGenerated] = useState<Generated | null>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("menu-gen")
      if (saved) {
        const obj = JSON.parse(saved)
        setMenuType(obj.menuType ?? "sportif")
        setPeople(obj.people ?? 2)
        setGenerated(obj.generated ?? null)
        setDark(obj.dark ?? false)
        document.documentElement.classList.toggle("dark", obj.dark ?? false)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menu-gen", JSON.stringify({ menuType, people, generated, dark }))
    }
  }, [menuType, people, generated, dark])

  const pool = useMemo(() => RECIPES.filter(r => r.type === menuType), [menuType])

  function generate() {
    const recipe = pool[Math.floor(Math.random() * pool.length)]
    const ingredientsScaled = recipe.ingredients.map(i => ({
      name: i.name,
      qty: i.qtyPerPerson * people,
      unit: i.unit
    }))
    setGenerated({ recipe, people, ingredientsScaled })
  }

  function copyList() {
    if (!generated) return
    navigator.clipboard.writeText(makeShoppingText(generated))
  }

  function printPage() {
    window.print()
  }

  useEffect(() => {
    if (!generated) generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length])

  return (
    <div className="mx-auto w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="h-7 w-7" />
              <div>
                <CardTitle>Créateur de menus du soir</CardTitle>
                <CardDescription>Choisissez un type de menu et le nombre de personnes — on s’occupe des quantités.</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Basculer le thème" onClick={() => {
              const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next)
            }}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label className="mb-2 block">Type de menu</Label>
              <Select value={menuType} onValueChange={v => setMenuType(v as any)}>
                <SelectTrigger><SelectValue placeholder="Choisir…" /></SelectTrigger>
                <SelectContent>
                  {MENU_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Label className="mb-2 block">Nombre de personnes</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={people}
                  onChange={e => setPeople(Math.max(1, Math.min(12, Number(e.target.value))))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex items-end gap-2">
              <Button onClick={generate} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Générer
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {generated && (
          <motion.div
            key={generated.recipe.id + generated.people}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <Card>
              <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{generated.recipe.title}</CardTitle>
                  <CardDescription>{generated.recipe.time} • {MENU_TYPES.find(m => m.value === generated.recipe.type)?.label}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={copyList}><Copy className="mr-2 h-4 w-4" /> Copier la liste</Button>
                  <Button variant="outline" onClick={printPage}><Printer className="mr-2 h-4 w-4" /> Imprimer</Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-lg font-semibold flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> Ingrédients (pour {generated.people})</h4>
                  <ul className="grid gap-2">
                    {generated.ingredientsScaled.map((i) => (
                      <li key={i.name} className="flex items-center justify-between rounded-xl border px-3 py-2">
                        <span>{i.name}</span>
                        <span className="tabular-nums font-medium">{formatQty(i.qty)} {i.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-lg font-semibold">Étapes</h4>
                  <ol className="grid gap-3">
                    {generated.recipe.steps.map((s, idx) => (
                      <li key={idx} className="rounded-xl border p-3 leading-relaxed"><span className="mr-2 font-semibold">{idx+1}.</span>{s}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Astuce : cliquez sur <strong>Générer</strong> pour obtenir d’autres idées dans le même type.
      </p>
    </div>
  )
}
