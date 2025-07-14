Sure! Here's a **clean Markdown (`README.md`) section** listing the most useful `docker-compose` commands your dev team can use when working on your React Native project:

---

````markdown
## 🚀 Docker Compose Commands for Development

Here are the most common `docker-compose` commands you’ll use during development:

### ▶️ Start the app (build + run)
```bash
docker-compose up
````

### ▶️ Start the app in detached mode (in background)

```bash
docker-compose up -d
```

### 🔁 Rebuild the image and restart the container

```bash
docker-compose up --build
```

### ⛔ Stop the container

```bash
docker-compose down
```

### 🔄 Stop and remove everything (containers + volumes)

```bash
docker-compose down -v
```

### 📦 Rebuild without using cache

```bash
docker-compose build --no-cache
```

### 🧼 Clean all stopped containers and networks

```bash
docker-compose rm
```

### 📜 View live container logs

```bash
docker-compose logs -f
```

### 🧠 Reset Metro cache (for React Native)

```bash
docker-compose exec fitni npm start -- --reset-cache
```

