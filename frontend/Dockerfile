# Multi-stage Dockerfile for Vibe-Roaster Frontend

# ============================================================================
# Stage 1: Base
# ============================================================================
FROM node:18-alpine as base

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# ============================================================================
# Stage 2: Dependencies
# ============================================================================
FROM base as dependencies

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# ============================================================================
# Stage 3: Development
# ============================================================================
FROM dependencies as development

# Copy application code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ============================================================================
# Stage 4: Builder
# ============================================================================
FROM dependencies as builder

# Copy application code
COPY . .

# Build application
RUN npm run build

# ============================================================================
# Stage 5: Production
# ============================================================================
FROM nginx:alpine as production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

