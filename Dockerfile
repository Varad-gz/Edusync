# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies separately to leverage caching
COPY package.json package-lock.json* ./
RUN npm install

# Stage 2: Build environment with Prisma
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Stage 3: Final runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# Copy app and dependencies
COPY --from=builder /app ./

# Expose Next.js dev port
EXPOSE 3000

USER nextjs

# Run in development mode
CMD ["npm", "run", "dev"]
