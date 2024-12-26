# Sử dụng Node.js LTS (Long-Term Support) trên Alpine Linux
FROM node:lts-buster

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để cache dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .
RUN npm run build
# Chạy ứng dụng ở chế độ production (Next.js)
CMD ["npm", "run", "start"]
