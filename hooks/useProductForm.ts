// hooks/useProductForm.ts
"use client";

import type React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Move interfaces here
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

const INITIAL_STATE: FormData = {
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
};

export function useProductForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    // ... all your other validation rules ...
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
      const res = await axios.post("/api/presigned_upload_url", { filenames });
      const { urls } = res.data; // array of { uploadUrl, fileUrl }

      // upload all images in parallel
      await Promise.all(
        urls.map((u: any, i: number) =>
          axios.put(u.uploadUrl, imageFiles[i])
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

      await axios.post("/api/upload-product", productData);

      toast.success("Product uploaded successfully!");
      setFormData(INITIAL_STATE); // Reset form using initial state
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
  };

  // Return everything the component needs
  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm, // Expose the reset function
  };
}