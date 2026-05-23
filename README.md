# Worknoon Chat Infrastructure Engine



An enterprise-ready, role-enforced real-time data orchestration platform built using Node.js, Express, MongoDB, and Socket.io. This system powers secure communications among five clear user classifications: Admin, Agent, Customer, Designer, and Merchant.



---



## Core Feature Ecosystem



### Part 1: System Essentials & Real-Time Engine

* **Stateless JWT Authorization:** Secured authorization workflows incorporating token issuance upon registration or verification.

* **Strict Role Segregation:** RBAC (Role-Based Access Control) enforced through specialized endpoint route guard checks.

* **Bi-directional Stream Pipeline:** Persistent WebSockets over Socket.io ensuring millisecond delivery overhead.

* **Full CRUD Management:** Enterprise-grade database models tracking room allocations and messages with explicit delivery state tracking.



### Part 2: Advanced Feature Ecosystem (Bonus)

* **Volatile Status Trackers:** Memory-efficient, broadcasted event mechanisms capturing real-time typing indications.

* **Persistent Connection Monitors:** Reactive state management flipping availability statuses instantly upon network state mutation.

* **Sanitized File Stream Interface:** Middleware restricting, checking, and validating system media buffers (5MB limit).

* **Asynchronous Notifications:** Automated mail delivery fallbacks alerting offline platform members instantly.



---



## Architecture and Technology Blueprint



* **Application Framework:** Express (Node.js runtime environment)

* **Data Layer Management:** Mongoose ODM interfacing with a highly indexed MongoDB schema

* **State & Stream Engine:** Socket.io Engine v4

* **Security Subsystems:** JSON Web Tokens (JWT) & automated cryptographically salted password hashing via BcryptJS

* **Resource Stream Handling:** Multer file parsing stream pipelines



---



## Project File Layout



├── src/

│   ├── controllers/

│   │   ├── authController.js

│   │   └── chatController.js

│   ├── middleware/

│   │   ├── auth.js

│   │   └── upload.js

│   ├── models/

│   │   ├── Conversation.js

│   │   ├── Message.js

│   │   └── User.js

│   ├── services/

│   │   └── notificationService.js

│   └── socket/

│       └── socketHandler.js

├── .env

├── package.json

└── server.js



Setup and Runtime instructions

1 Clone the Infrastructure Repository: 

git clone [https://github.com/anthonyagughasi/worknoon-chat-backend.git](https://github.com/anthonyagughasi/worknoon-chat-backend.git)

   cd worknoon-chat-backend

2 Assemble Runtime Dependencies:

npm install

3 Configure Environment Parameters:

Create a local .env configuration template file inside the project root:

PORT=5000

   MONGO_URI=your_mongodb_cluster_string

   JWT_SECRET=your_cryptographic_secret_key

   EMAIL_HOST=smtp.mailtrap.io

   EMAIL_PORT=2525

   EMAIL_USER=your_smtp_username

   EMAIL_PASS=your_smtp_password

4 Initialize Execution Environment:

npm start



Challenges Solved

1. High-Frequency Database Operations

Problem: Updating message state flags (read/unread) across busy chats can bottleneck MongoDB.

Solution: Decoupled status mechanics by caching transient events (like user typing or presence) in-memory using Socket.io, while structuring highly grouped collections for database reads.

2. Guarding Multi-Role Environments

Problem: Handling varied privileges across five different account roles (admin, agent, customer, designer, merchant) can easily lead to authorization bugs.

Solution: Built an automated, highly reusable functional middleware wrapper (authorizeRoles(...roles)) that filters requests before they ever reach the data engine layer.

