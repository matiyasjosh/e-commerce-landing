// components/ProductForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/image-uplaod";
import { useProductForm } from "@/hooks/useProductForm"; // Import your new hook

export function ProductForm() {
  // All the logic is now contained in this single hook call
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm, // Get the reset function from the hook
  } = useProductForm();

  // The component is now just the JSX (the "view")
  return (
    <div className="space-y-8">
      {submitSuccess && (
        <div className="bg-primary/20 border border-primary p-4 rounded">
          <p className="text-primary font-semibold">
            ✓ Product added successfully!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Name */}
        <div className="space-y-2">
          <Label
            htmlFor="productName"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Product Name
          </Label>
          <Input
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={formData.productName}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={isSubmitting}
          />
          {errors.productName && (
            <p className="text-destructive text-sm">{errors.productName}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label
            htmlFor="shortDescription"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Short Description
          </Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            placeholder="Enter a short description of the product"
            value={formData.shortDescription}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary resize-none"
            rows={3}
            disabled={isSubmitting}
          />
          {errors.shortDescription && (
            <p className="text-destructive text-sm">
              {errors.shortDescription}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label
            htmlFor="price"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Price
          </Label>
          <Input
            id="price"
            name="price"
            placeholder="0.00"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={isSubmitting}
          />
          {errors.price && (
            <p className="text-destructive text-sm">{errors.price}</p>
          )}
        </div>

        {/* Brand Description Fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold tracking-wider uppercase">
            Brand Description
          </h3>
          <div className="grid gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-2">
                <Label
                  htmlFor={`brandDesc${num}`}
                  className="uppercase text-xs tracking-wider font-bold"
                >
                  Description {num}
                </Label>
                <Input
                  id={`brandDesc${num}`}
                  name={`brandDesc${num}`}
                  placeholder={`Enter brand description ${num}`}
                  value={
                    formData[`brandDesc${num}` as keyof typeof formData] as string
                  }
                  onChange={handleInputChange}
                  className="border-2 focus-visible:ring-primary focus-visible:border-primary"
                  disabled={isSubmitting}
                />
                {errors[`brandDesc${num}`] && (
                  <p className="text-destructive text-sm">
                    {errors[`brandDesc${num}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tag */}
        <div className="space-y-2">
          <Label
            htmlFor="tag"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Tag
          </Label>
          <Input
            id="tag"
            name="tag"
            placeholder="Enter product tag (e.g., premium, new, sale)"
            value={formData.tag}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={isSubmitting}
          />
          {errors.tag && (
            <p className="text-destructive text-sm">{errors.tag}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label
            htmlFor="categoryId"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Category
          </Label>
          <Input
            id="categoryId"
            name="categoryId"
            type="number"
            placeholder="Enter product category (e.g., 1, 2, 3)"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={isSubmitting}
          />
          {errors.categoryId && (
            <p className="text-destructive text-sm">{errors.categoryId}</p>
          )}
        </div>

        {/* stock */}
        <div className="space-y-2">
          <Label
            htmlFor="stock"
            className="uppercase text-xs tracking-wider font-bold"
          >
            Stock
          </Label>
          <Input
            id="stock"
            name="stock"
            placeholder="0"
            type="number"
            step="1"
            value={formData.stock}
            onChange={handleInputChange}
            className="border-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={isSubmitting}
          />
          {errors.stock && (
            <p className="text-destructive text-sm">{errors.stock}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold tracking-wider uppercase">
            Product Images
          </h3>
          <p className="text-muted-foreground text-sm">
            Upload three product images (required)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <ImageUpload
                key={index}
                index={index}
                onImageChange={handleImageChange}
                disabled={isSubmitting}
              />
            ))}
          </div>
          {errors.images && (
            <p className="text-destructive text-sm">{errors.images}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-2 hover:border-primary hover:bg-primary/10 font-bold uppercase tracking-wider h-12 bg-transparent"
            onClick={resetForm} // Use the new reset function
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
}