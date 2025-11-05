import { ProductForm } from "@/components/product-form"

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold tracking-[0.2em] uppercase">DEMOBAZA</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Add New Product</h1>
          <p className="text-muted-foreground">Fill in the product details below and upload images</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <ProductForm />
      </div>
    </main>
  )
}