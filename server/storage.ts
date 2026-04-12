import { type User, type InsertUser, type Collection, type InsertCollection } from "@shared/schema";
import { randomUUID } from "crypto";
import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection
let mongoClient: MongoClient | null = null;
let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DATABASE_NAME = "ij_bangles";
const COLLECTIONS_NAME = "collections";

export async function getMongoClient(): Promise<MongoClient> {
  if (mongoClient && isConnected) {
    return mongoClient;
  }

  mongoClient = new MongoClient(MONGODB_URI);
  try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");
    isConnected = true;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }

  return mongoClient;
}

export async function closeMongoClient(): Promise<void> {
  if (mongoClient) {
    await mongoClient.close();
    isConnected = false;
    mongoClient = null;
  }
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Collection methods
  getCollections(): Promise<Collection[]>;
  getCollectionById(id: string): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  updateCollection(id: string, collection: Partial<InsertCollection>): Promise<Collection | undefined>;
  deleteCollection(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCollections(): Promise<Collection[]> {
    throw new Error("Collections storage not implemented for MemStorage");
  }

  async getCollectionById(id: string): Promise<Collection | undefined> {
    throw new Error("Collections storage not implemented for MemStorage");
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    throw new Error("Collections storage not implemented for MemStorage");
  }

  async updateCollection(
    id: string,
    collection: Partial<InsertCollection>
  ): Promise<Collection | undefined> {
    throw new Error("Collections storage not implemented for MemStorage");
  }

  async deleteCollection(id: string): Promise<boolean> {
    throw new Error("Collections storage not implemented for MemStorage");
  }
}

export class MongoStorage implements IStorage {
  private client: MongoClient;

  constructor(client: MongoClient) {
    this.client = client;
  }

  private getCollectionsDb() {
    return this.client
      .db(DATABASE_NAME)
      .collection<Omit<Collection, "id"> & { _id?: ObjectId }>(COLLECTIONS_NAME);
  }

  async getUser(id: string): Promise<User | undefined> {
    // Placeholder for user storage in MongoDB
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Placeholder for user storage in MongoDB
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Placeholder for user creation in MongoDB
    throw new Error("User creation not implemented for MongoDB");
  }

  async getCollections(): Promise<Collection[]> {
    const collectionsDb = this.getCollectionsDb();
    const docs = await collectionsDb.find({}).toArray();
    return docs.map((doc) => ({
      ...doc,
      id: doc._id ? doc._id.toString() : (doc as any).id,
    } as Collection));
  }

  async getCollectionById(id: string): Promise<Collection | undefined> {
    const collectionsDb = this.getCollectionsDb();
    
    // Try to find by string id first
    let doc = await collectionsDb.findOne({ id });
    if (!doc) {
      // Try ObjectId if hex string
      try {
        doc = await collectionsDb.findOne({ _id: new ObjectId(id) });
      } catch (e) {
        // Not a valid ObjectId
      }
    }

    if (!doc) {
      return undefined;
    }

    return {
      ...doc,
      id: doc._id ? doc._id.toString() : (doc as any).id,
    } as Collection;
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const collectionsDb = this.getCollectionsDb();
    
    const newCollection = {
      id: collection.id || randomUUID(),
      name: collection.name,
      description: collection.description,
      price: collection.price,
      mainImage: collection.mainImage,
      images: collection.images || [],
      createdAt: collection.createdAt || new Date().toISOString(),
    };

    const result = await collectionsDb.insertOne(newCollection as any);
    
    return {
      ...newCollection,
      id: result.insertedId.toString(),
    };
  }

  async updateCollection(
    id: string,
    collection: Partial<InsertCollection>
  ): Promise<Collection | undefined> {
    const collectionsDb = this.getCollectionsDb();
    
    // Try to update by string id first
    let result = await collectionsDb.findOneAndUpdate(
      { id },
      { $set: collection },
      { returnDocument: "after" }
    );

    if (!result) {
      // Try ObjectId if hex string
      try {
        result = await collectionsDb.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: collection },
          { returnDocument: "after" }
        );
      } catch (e) {
        // Not a valid ObjectId
      }
    }

    if (!result) {
      return undefined;
    }

    const doc = result;
    return {
      ...doc,
      id: doc._id ? doc._id.toString() : (doc as any).id,
    } as Collection;
  }

  async deleteCollection(id: string): Promise<boolean> {
    const collectionsDb = this.getCollectionsDb();
    
    // Try to delete by string id first
    let result = await collectionsDb.deleteOne({ id });
    if (result.deletedCount === 0) {
      // Try ObjectId if hex string
      try {
        result = await collectionsDb.deleteOne({ _id: new ObjectId(id) });
      } catch (e) {
        // Not a valid ObjectId
      }
    }

    return result.deletedCount > 0;
  }
}

// Initialize storage based on environment
let storage: IStorage;

async function initializeStorage() {
  try {
    const mongoClient = await getMongoClient();
    storage = new MongoStorage(mongoClient);
  } catch (error) {
    console.error("Failed to initialize MongoDB storage, falling back to memory storage:", error);
    storage = new MemStorage();
  }
}

// Initialize on import
initializeStorage().catch(console.error);

export { storage, initializeStorage };
