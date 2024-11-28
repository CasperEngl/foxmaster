# Base image with Node.js
FROM node:20 AS base

# Install bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install

# Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Final stage: Set up the runtime environment
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create and set the application user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built files from the builder stage
COPY --from=builder /app/public ./public
# Change ownership of the public directory to the application user
RUN chown -R nextjs:nodejs ./public

# Setup directories and permissions for runtime
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["node", "server.js"]
