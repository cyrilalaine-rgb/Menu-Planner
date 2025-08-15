import MenuGenerator from "@/components/menu-generator"

export default function Page() {
  return (
    <main className="container py-8 md:py-12">
      <MenuGenerator />
      <footer className="mt-10 text-center text-xs text-muted-foreground">
        Fait avec Next.js, Tailwind, shadcn/ui, Radix Themes, Lucide & Framer Motion.
      </footer>
    </main>
  )
}
