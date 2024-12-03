# Sử dụng Node.js LTS (Long-Term Support) trên Alpine Linux
FROM node:lts-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để cache dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 3000 cho Next.js (hoặc cổng khác nếu cần)
EXPOSE 3000

# Chạy ứng dụng ở chế độ phát triển (Next.js)
CMD ["npm", "run", "dev"]
