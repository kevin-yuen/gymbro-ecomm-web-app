# Instructions to host on dev environment
1. index.js

### comment out the codes below
```
app.use(
  cors({
    origin: "https://gymbro-fitness.vercel.app",
    methods: ["POST", "GET", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
  })
);
```

### uncomment the codes below
```
app.use(cors());
```

2. .env

### comment out the codes below
```
BASE_URL=https://gymbro-ecomm-web-app-backend.vercel.app    # for production environemnt
REDIRECT_BASE_URL=https://gymbro-fitness.vercel.app         # for production environment
```

### uncomment the codes below
```
BASE_URL=http://localhost:4000              # for development environment
REDIRECT_BASE_URL=http://localhost:3000     # for development environment
```

# Instructions to host on production environment
