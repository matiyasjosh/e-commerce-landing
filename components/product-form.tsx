"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/image-uplaod";

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  productName: string;
  shortDescription: string;
  price: string;
  brandDesc1: string;
  brandDesc2: string;
  brandDesc3: string;
  tag: string;
  categoryId: string;
  stock: string;
  images: (File | null)[];
}

export function ProductForm() {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    shortDescription: "",
    price: "",
    brandDesc1: "",
    brandDesc2: "",
    brandDesc3: "",
    tag: "",
    categoryId: "",
    stock: "",
    images: [null, null, null],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(Number.parseFloat(formData.price)) ||
      Number.parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.brandDesc1.trim()) {
      newErrors.brandDesc1 = "First brand description is required";
    }
    if (!formData.brandDesc2.trim()) {
      newErrors.brandDesc2 = "Second brand description is required";
    }
    if (!formData.brandDesc3.trim()) {
      newErrors.brandDesc3 = "Third brand description is required";
    }

    if (!formData.tag.trim()) {
      newErrors.tag = "Tag is required";
    }

    // categoryId must be provided and a positive integer
    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Category is required";
    } else if (
      isNaN(Number(formData.categoryId)) ||
      Number(formData.categoryId) <= 0
    ) {
      newErrors.categoryId = "Category must be a valid category id";
    }

    if (formData.images.some((img) => !img)) {
      newErrors.images = "All three images are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (index: number, file: File | null) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages[index] = file;
      return {
        ...prev,
        images: newImages,
      };
    });
    // Clear image error when all images are selected
    if (errors.images && !formData.images.some((img) => !img)) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const imageFiles = formData.images;

      // request presigned urls for all images
      const filenames = imageFiles.map((file: File | null) => file?.name);
      console.log("file_name", filenames);
      const res = await fetch("/api/presigned_upload_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filenames }),
      });

      const { urls } = await res.json(); // array of { upload_url, fileurl}

      // upload all images in parallel
      await Promise.all(
        urls.map((u: any, i: number) =>
          fetch(u.uploadUrl, { method: "PUT", body: imageFiles[i] })
        )
      );

      const imageUrls = urls.map((u: any) => u.fileUrl);

      const productData = {
        name: formData.productName,
        price: Number.parseFloat(formData.price),
        shortDescription: formData.shortDescription,
        brandDesc1: formData.brandDesc1,
        brandDesc2: formData.brandDesc2,
        brandDesc3: formData.brandDesc3,
        tag: formData.tag,
        categoryId: Number(formData.categoryId),
        stock: Number(formData.stock),
        images: imageUrls,
      };

      await fetch("/api/upload-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      setSubmitSuccess(true);
      setFormData({
        productName: "",
        shortDescription: "",
        price: "",
        brandDesc1: "",
        brandDesc2: "",
        brandDesc3: "",
        tag: "",
        categoryId: "",
        stock: "",
        images: [null, null, null],
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    formData[`brandDesc${num}` as keyof FormData] as string
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
            onClick={() => {
              setFormData({
                productName: "",
                shortDescription: "",
                price: "",
                brandDesc1: "",
                brandDesc2: "",
                brandDesc3: "",
                tag: "",
                categoryId: "",
                stock: "",
                images: [null, null, null],
              });
              setErrors({});
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
}
