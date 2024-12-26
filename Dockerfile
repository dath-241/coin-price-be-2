# Sử dụng Node.js LTS (Long-Term Support) trên Alpine Linux
FROM node:lts-buster as builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để cache dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install --frozen-lockfile

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng (Next.js)
RUN npm run build

# 2. Run Stage
FROM node:18-alpine

# Copy node_modules từ stage 1
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose port
EXPOSE 3000

# Chạy ứng dụng ở chế độ production (Next.js)
CMD ["npm", "start"]
