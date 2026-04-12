import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ImagePlus, UploadCloud, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { fileToBase64, filesToBase64, isValidImageFile, isValidImageSize } from "@/lib/imageUtils";

const formSchema = z.object({
  name: z.string().min(2, "Collection name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.string().min(1, "Price is required"),
  mainImage: z.string().min(1, "Main image is required"),
  images: z.array(z.string()).min(1, "At least one gallery image is required")
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminAddCollection() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      mainImage: "",
      images: []
    }
  });

  const createMutation = useMutation({
    mutationFn: api.createCollection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast({
        title: "Collection Added",
        description: `${data.name} has been successfully created.`,
      });
      setLocation("/collections");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create collection.",
        variant: "destructive"
      });
    }
  });

  function onSubmit(values: FormValues) {
    if (!mainImagePreview) {
      toast({
        title: "Error",
        description: "Please upload a main image",
        variant: "destructive"
      });
      return;
    }
    
    if (galleryImagePreviews.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one gallery image",
        variant: "destructive"
      });
      return;
    }

    createMutation.mutate({
      ...values,
      mainImage: mainImagePreview,
      images: galleryImagePreviews
    });
  }

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file (JPEG, PNG, GIF, or WebP)",
        variant: "destructive"
      });
      return;
    }

    if (!isValidImageSize(file)) {
      toast({
        title: "File Too Large",
        description: "Image must be smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setMainImagePreview(base64);
      form.setValue("mainImage", base64);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive"
      });
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const base64Array = await filesToBase64(files);
      
      // Validate all files
      for (let i = 0; i < files.length; i++) {
        if (!isValidImageFile(files[i])) {
          toast({
            title: "Invalid File",
            description: `"${files[i].name}" is not a valid image file`,
            variant: "destructive"
          });
          return;
        }
        if (!isValidImageSize(files[i])) {
          toast({
            title: "File Too Large",
            description: `"${files[i].name}" is larger than 5MB`,
            variant: "destructive"
          });
          return;
        }
      }
      
      setGalleryImagePreviews(base64Array);
      form.setValue("images", base64Array);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process images",
        variant: "destructive"
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    const newPreviews = galleryImagePreviews.filter((_, i) => i !== index);
    setGalleryImagePreviews(newPreviews);
    form.setValue("images", newPreviews);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="bg-primary py-4 px-6 flex items-center shadow-md">
        <Link href="/collections">
          <a className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Back to Store
          </a>
        </Link>
        <div className="mx-auto text-xl font-serif text-secondary italic">Admin Panel</div>
      </header>

      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-none border-border shadow-lg">
            <CardHeader className="bg-muted/30 border-b border-border pb-8">
              <CardTitle className="text-3xl font-serif text-primary">Add New Collection</CardTitle>
              <CardDescription className="text-base">
                Upload images in binary form. Supported formats: JPEG, PNG, GIF, WebP (Max 5MB each)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base uppercase tracking-wider text-primary">Collection Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Summer Bridal Collection" className="rounded-none border-input focus-visible:ring-secondary text-lg py-6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base uppercase tracking-wider text-primary">Price</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ₹2,499" className="rounded-none border-input focus-visible:ring-secondary text-lg py-6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mainImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base uppercase tracking-wider text-primary">Main Banner Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <label className="block border-2 border-dashed border-input p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer rounded">
                              <div className="flex flex-col items-center justify-center">
                                <UploadCloud className="h-12 w-12 text-muted-foreground mb-3" />
                                <span className="text-sm font-medium text-foreground">Click to upload main image</span>
                                <span className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF, WebP (Max 5MB)</span>
                              </div>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleMainImageChange}
                              />
                            </label>
                            {mainImagePreview && (
                              <div className="relative">
                                <img 
                                  src={mainImagePreview} 
                                  alt="Main preview" 
                                  className="w-full h-48 object-cover rounded border border-input"
                                />
                                <span className="text-xs text-green-600 mt-2 block">✓ Main image uploaded</span>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base uppercase tracking-wider text-primary">Gallery Images</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <label className="block border-2 border-dashed border-input p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer rounded">
                              <div className="flex flex-col items-center justify-center">
                                <ImagePlus className="h-12 w-12 text-muted-foreground mb-3" />
                                <span className="text-sm font-medium text-foreground">Click to upload gallery images</span>
                                <span className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF, WebP (Max 5MB each, multiple allowed)</span>
                              </div>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                multiple
                                onChange={handleGalleryImagesChange}
                              />
                            </label>
                            {galleryImagePreviews.length > 0 && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {galleryImagePreviews.map((preview, idx) => (
                                    <div key={idx} className="relative group">
                                      <img 
                                        src={preview} 
                                        alt={`Gallery ${idx + 1}`} 
                                        className="w-full h-32 object-cover rounded border border-input"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeGalleryImage(idx)}
                                        className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                      >
                                        <X className="h-6 w-6 text-white" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-xs text-green-600">✓ {galleryImagePreviews.length} image(s) uploaded</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base uppercase tracking-wider text-primary">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief explanation of the collection..." 
                            className="rounded-none border-input focus-visible:ring-secondary min-h-[150px] text-base resize-y" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-6 text-lg uppercase tracking-widest"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Creating Collection..." : "Create Collection"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
