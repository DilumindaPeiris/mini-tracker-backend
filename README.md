# Mini Equipment Tracker (Backend)

A Node.js and Express API for tracking equipment inventory and managing checkouts. Built with MongoDB and Mongoose.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas / Local MongoDB
* **ODM:** Mongoose

## Getting Started

### Prerequisites
* Node.js installed
* MongoDB running locally or an Atlas cluster

### Installation
1. Clone the repository
2. Run `npm install` to install dependencies (express, mongoose, cors, dotenv)
3. Create a `.env` file in the root directory and add your connection variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/EquipmentTracker
   PORT=5000
4. Start the server using `node server.js`

## API Endpoints
* `GET /api/items` - Fetch all inventory items
* `POST /api/checkout` - Decrement item available quantity and log checkout record
