# MongoDB Backend Integration & CRUD API

This document outlines the MongoDB integration and CRUD API for the IJ Bangles application.

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB installed locally OR MongoDB Atlas account

### Environment Configuration

1. **Local MongoDB Setup:**
   - Install MongoDB community edition from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Ensure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017`

2. **MongoDB Atlas Setup (Cloud):**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string (looks like: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ij_bangles?retryWrites=true&w=majority`)

3. **Configure Environment:**
   ```bash
   # Create .env file in project root
   MONGODB_URI=mongodb://localhost:27017
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ij_bangles?retryWrites=true&w=majority
   
   NODE_ENV=development
   PORT=5000
   ```

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm run dev

# In another terminal, start the client
npm run dev:client
```

The application will:
- Connect to MongoDB and auto-seed initial collections if the database is empty
- Serve the API on `http://localhost:5000/api`
- Serve the client on `http://localhost:5000`

## API Endpoints

### Collections CRUD API

All endpoints are prefixed with `/api/collections`

#### 1. **Get All Collections**
```
GET /api/collections
```

**Response:**
```json
[
  {
    "id": "royal-kundan",
    "name": "Royal Kundan Bangles",
    "description": "Intricate Kundan work...",
    "price": "₹2,499",
    "mainImage": "https://example.com/image.jpg",
    "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
]
```

#### 2. **Get Collection by ID**
```
GET /api/collections/:id
```

**Parameters:**
- `id` (string): Collection ID

**Response:**
```json
{
  "id": "royal-kundan",
  "name": "Royal Kundan Bangles",
  "description": "Intricate Kundan work...",
  "price": "₹2,499",
  "mainImage": "https://example.com/image.jpg",
  "images": ["https://example.com/img1.jpg"],
  "createdAt": "2023-10-01T00:00:00.000Z"
}
```

**Errors:**
- `404`: Collection not found

#### 3. **Create Collection**
```
POST /api/collections
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Summer Collection",
  "description": "Beautiful summer bangles with modern designs",
  "price": "₹3,999",
  "mainImage": "https://example.com/main.jpg",
  "images": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Summer Collection",
  "description": "Beautiful summer bangles...",
  "price": "₹3,999",
  "mainImage": "https://example.com/main.jpg",
  "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
  "createdAt": "2024-03-30T10:00:00.000Z"
}
```

**Errors:**
- `400`: Invalid collection data (missing required fields or invalid URLs)
- `500`: Server error

#### 4. **Update Collection**
```
PUT /api/collections/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string): Collection ID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "price": "₹4,999"
}
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Updated Name",
  "description": "Original description...",
  "price": "₹4,999",
  "mainImage": "https://example.com/main.jpg",
  "images": ["https://example.com/img1.jpg"],
  "createdAt": "2024-03-30T10:00:00.000Z"
}
```

**Errors:**
- `400`: Invalid collection data
- `404`: Collection not found
- `500`: Server error

#### 5. **Delete Collection**
```
DELETE /api/collections/:id
```

**Parameters:**
- `id` (string): Collection ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Collection deleted successfully"
}
```

**Errors:**
- `404`: Collection not found
- `500`: Server error

## Database Schema

The MongoDB database (`ij_bangles`) contains a `collections` collection with the following fields:

```typescript
{
  _id: ObjectId;              // Auto-generated MongoDB ID
  id: string;                 // Custom string ID
  name: string;               // Collection name (required)
  description: string;        // Collection description (required, min 1 char)
  price: string;              // Price string (required, e.g., "₹2,499")
  mainImage: string;          // Main image URL (required, must be valid URL)
  images: string[];           // Array of image URLs (required, min 1 URL)
  createdAt: string;          // ISO timestamp (auto-set on creation)
}
```

## Client API

The client API (`client/src/lib/api.ts`) provides methods to interact with the backend:

```typescript
// Get all collections
const collections = await api.getCollections();

// Get single collection
const collection = await api.getCollectionById(id);

// Create collection
const newCollection = await api.createCollection({
  name: "New Collection",
  description: "Description",
  price: "₹1,999",
  mainImage: "https://example.com/img.jpg",
  images: ["https://example.com/img1.jpg"]
});

// Update collection
const updated = await api.updateCollection(id, {
  price: "₹2,499"
});

// Delete collection
const result = await api.deleteCollection(id);
```

## Admin Panel

Access the admin panel at `/collections` to:
- View all collections
- Add new collections
- Update existing collections
- Delete collections

The admin form requires:
- Collection name (min 2 characters)
- Description (min 10 characters)
- Price (e.g., "₹2,499")
- Main image URL
- Gallery image URLs (comma-separated)

## Error Handling

All API endpoints return appropriate HTTP status codes:
- `200`: Success (GET, PUT, DELETE)
- `201`: Created (POST)
- `400`: Bad request (validation errors)
- `404`: Not found
- `500`: Server error

Error response format:
```json
{
  "message": "Error description",
  "errors": [] // Zod validation errors (if applicable)
}
```

## Development

### Project Structure

```
server/
  ├── index.ts         # Express server setup
  ├── routes.ts        # CRUD routes
  ├── storage.ts       # MongoDB storage layer
  └── vite.ts          # Vite integration

client/src/
  ├── lib/
  │   └── api.ts       # Client API methods
  └── pages/
      └── AdminAddCollection.tsx  # Admin UI

shared/
  └── schema.ts        # TypeScript types and Zod schemas
```

### Adding New Endpoints

1. Update `shared/schema.ts` with new types
2. Add methods to `IStorage` interface in `server/storage.ts`
3. Implement methods in `MongoStorage` class
4. Add routes to `server/routes.ts`
5. Add client methods to `client/src/lib/api.ts`

## Troubleshooting

### Connection Issues

**MongoDB connection refused:**
- Ensure MongoDB is running: `mongod` (local) or check MongoDB Atlas status
- Verify `MONGODB_URI` in `.env`
- Check firewall/network settings

**"Database connection failed":**
- Verify connection string format
- Check credentials in MongoDB Atlas
- Ensure IP whitelist includes your machine (MongoDB Atlas)

### Data Issues

**Collections not showing:**
- Verify MongoDB connection is successful
- Check browser console for API errors
- Ensure collections exist in MongoDB

**Admin form submission fails:**
- Verify all required fields are filled
- Check that image URLs are valid (start with http/https)
- Check browser console and server logs for error details

## Performance Considerations

- Collections are fetched from MongoDB on each request (no caching)
- For production, consider implementing:
  - Server-side caching (Redis)
  - Pagination for large collections
  - Indexes on frequently queried fields
  - Image optimization and CDN

## Security Notes

- `.env` file is not tracked in Git (see `.gitignore`)
- Never commit MongoDB credentials
- For production:
  - Use environment variables for credentials
  - Implement authentication/authorization
  - Add rate limiting
  - Validate and sanitize all inputs
  - Use HTTPS
