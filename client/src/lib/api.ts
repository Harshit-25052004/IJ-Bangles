import { mockCollections } from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep an in-memory copy of the collections to simulate additions/deletions during the session
let collectionsStore = [...mockCollections];

export const api = {
  // GET /api/collections
  getCollections: async () => {
    await delay(800); // Simulate loading
    return collectionsStore;
  },

  // GET /api/collections/:id
  getCollectionById: async (id: string) => {
    await delay(800);
    const collection = collectionsStore.find(c => c.id === id);
    if (!collection) {
      throw new Error("Collection not found");
    }
    return collection;
  },

  // POST /api/collections
  createCollection: async (data: any) => {
    await delay(1200);
    const newCollection = {
      id: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: data.name,
      description: data.description,
      // In a real app, these would be uploaded URLs. Here we mock them.
      mainImage: "https://images.unsplash.com/photo-1599643478514-4a884ebcb80f?q=80&w=800&auto=format&fit=crop", 
      images: [
        "https://images.unsplash.com/photo-1599643478514-4a884ebcb80f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
      ],
      price: "₹0", // Default or you could add a price field to the form
      createdAt: new Date().toISOString()
    };
    
    collectionsStore = [...collectionsStore, newCollection];
    return newCollection;
  },

  // DELETE /api/collections/:id
  deleteCollection: async (id: string) => {
    await delay(800);
    collectionsStore = collectionsStore.filter(c => c.id !== id);
    return { success: true };
  }
};
