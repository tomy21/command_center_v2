FROM node:20-alpine

# Menetapkan direktori kerja
WORKDIR /app

# Menyalin file Yarn dan package.json
COPY package.json yarn.lock ./

# Menginstall dependencies
RUN yarn install

# Menyalin semua source code
COPY . .

# Build aplikasi
RUN yarn build

# Install serve secara global
RUN yarn global add serve

# Expose port
EXPOSE 4002

# Jalankan aplikasi
CMD ["serve", "-s", "build"]
