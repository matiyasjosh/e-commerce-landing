"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  index: number
  onImageChange: (index: number, file: File | null) => void
  disabled?: boolean
}

export function ImageUpload({ index, onImageChange, disabled = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onImageChange(index, file)
      setFileName(file.name)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    onImageChange(index, null)
    setPreview(null)
    setFileName("")
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onImageChange(index, file)
      setFileName(file.name)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-3">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="block border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wider">Image {index + 1}</span>
            <span className="text-xs text-muted-foreground">Click or drag to upload</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled}
            className="hidden"
            aria-label={`Upload image ${index + 1}`}
          />
        </label>
      ) : (
        <div className="relative">
          <div className="border-2 border-primary rounded-lg overflow-hidden bg-muted">
            <img
              src={preview || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="mt-2 text-xs truncate text-muted-foreground">{fileName}</div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
            className="absolute top-2 right-2 bg-background/80 hover:bg-destructive hover:text-destructive-foreground border-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
