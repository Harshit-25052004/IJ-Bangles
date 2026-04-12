import type { Collection, InsertCollection } from "@shared/schema";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const API_BASE_URL = "/api";

export const api = {
  // GET /api/collections
  getCollections: async (): Promise<Collection[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`);
      if (!response.ok) {
        throw new Error(`Failed to fetch collections: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  },

  // GET /api/collections/:id
  getCollectionById: async (id: string): Promise<Collection> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Collection not found");
        }
        throw new Error(`Failed to fetch collection: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching collection:", error);
      throw error;
    }
  },

  // POST /api/collections
  createCollection: async (data: InsertCollection): Promise<Collection> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create collection: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  },

  // PUT /api/collections/:id
  updateCollection: async (id: string, data: Partial<InsertCollection>): Promise<Collection> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update collection: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating collection:", error);
      throw error;
    }
  },

  // DELETE /api/collections/:id
  deleteCollection: async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete collection: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting collection:", error);
      throw error;
    }
  }
};
