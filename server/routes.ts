import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCollectionSchema, collectionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // ==================== Collections CRUD Routes ====================
  
  // GET /api/collections - Get all collections
  app.get("/api/collections", async (req, res) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  // GET /api/collections/:id - Get collection by ID
  app.get("/api/collections/:id", async (req, res) => {
    try {
      const collection = await storage.getCollectionById(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      console.error("Error fetching collection:", error);
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  // POST /api/collections - Create a new collection
  app.post("/api/collections", async (req, res) => {
    try {
      const validatedData = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validatedData);
      res.status(201).json(collection);
    } catch (error: any) {
      console.error("Error creating collection:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid collection data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create collection" });
    }
  });

  // PUT /api/collections/:id - Update a collection
  app.put("/api/collections/:id", async (req, res) => {
    try {
      const partialData = insertCollectionSchema.partial().parse(req.body);
      const collection = await storage.updateCollection(req.params.id, partialData);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json(collection);
    } catch (error: any) {
      console.error("Error updating collection:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid collection data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update collection" });
    }
  });

  // DELETE /api/collections/:id - Delete a collection
  app.delete("/api/collections/:id", async (req, res) => {
    try {
      const success = await storage.deleteCollection(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json({ success: true, message: "Collection deleted successfully" });
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ message: "Failed to delete collection" });
    }
  });

  return httpServer;
}
