# NoteStream  

NoteStream is a real-time collaborative notebook where users can create a link, write notes, and instantly see updates reflected across all connected tabs.  
It enables seamless text synchronization and live collaboration, similar to a lightweight shared document editor.  
Built for speed, simplicity, and scalability.  

---

## 🚀 Tech Stack  

- **Backend:** Express.js  
- **Database:** Postgres with Drizzle ORM  
- **Cache & Pub/Sub:** Redis  
- **Realtime Communication:** Socket.IO  
- **Frontend Templating:** EJS  
- **Containerization:** Docker & Docker Compose
---


## 📦 Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/Paras-Punjabi/NoteStream
   cd NoteStream
   ```

2. Pull Docker Image
    ```bash
   docker pull paraspunjabi2002/codeshare
   ```

3. Start the Services
   ```bash
   docker-compose -f start-services.yml up --build -d
   Goto http://localhost:8000
   ```

4. Stop the Services
   ```bash
   docker-compose -f start-services.yml down
   ```
