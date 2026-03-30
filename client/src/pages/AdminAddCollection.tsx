import React from "react";
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
import { ArrowLeft, ImagePlus, UploadCloud } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Collection name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  mainImage: z.any().optional(),
  additionalImages: z.any().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminAddCollection() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      mainImage: undefined,
      additionalImages: undefined
    }
  });

  const createMutation = useMutation({
    mutationFn: api.createCollection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast({
        title: "Collection Added",
        description: `${data.name} has been successfully created via simulated API.`,
      });
      setLocation("/collections");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create collection.",
        variant: "destructive"
      });
    }
  });

  function onSubmit(values: FormValues) {
    createMutation.mutate(values);
  }

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
                Create a new product collection using the simulated API layer.
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="mainImage"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-base uppercase tracking-wider text-primary">Main Banner Image</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-input p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center h-40">
                              <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                              <span className="text-sm text-muted-foreground">Click to select image</span>
                              <input 
                                type="file" 
                                className="hidden" 
                                id="main-image-upload" 
                                accept="image/*"
                                onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                              />
                              <label htmlFor="main-image-upload" className="absolute inset-0 cursor-pointer"></label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalImages"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-base uppercase tracking-wider text-primary">Gallery Images</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-input p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center h-40 relative">
                              <ImagePlus className="h-10 w-10 text-muted-foreground mb-4" />
                              <span className="text-sm text-muted-foreground">Click to select multiple images</span>
                              <input 
                                type="file" 
                                className="hidden" 
                                id="gallery-image-upload" 
                                accept="image/*"
                                multiple
                                onChange={(e) => onChange(e.target.files)}
                              />
                              <label htmlFor="gallery-image-upload" className="absolute inset-0 cursor-pointer"></label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                    {createMutation.isPending ? "Simulating API Call..." : "Create Collection"}
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
