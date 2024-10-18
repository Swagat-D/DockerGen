const dockerFilesLatest = {
  Reactjs: `
      FROM node:18-alpine AS build
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      RUN npm run build
  
      FROM nginx:alpine
      COPY --from=build /app/build /usr/share/nginx/html
      EXPOSE 80
      CMD ["nginx", "-g", "daemon off;"]
    `,

  Nextjs: `
 # Use base image for dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies early to leverage caching
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build the application
FROM node:18-alpine AS build
WORKDIR /app

COPY . . 
# Use build-time caching for npm packages
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# Final image for running the app
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "run", "start"]

    `,

  Angularjs: `
      FROM node:18-alpine AS build
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      RUN npm run build
  
      FROM nginx:alpine
      COPY --from=build /app/dist /usr/share/nginx/html
      EXPOSE 80
      CMD ["nginx", "-g", "daemon off;"]
    `,

  Flask: `
      FROM python:3.12-alpine
      WORKDIR /app
      COPY requirements.txt ./
      RUN pip install --no-cache-dir -r requirements.txt
      COPY . .
      EXPOSE 5000
      CMD ["flask", "run", "--host=0.0.0.0"]
    `,

  Django: `
      FROM python:3.12-alpine
      WORKDIR /app
      COPY requirements.txt ./
      RUN pip install --no-cache-dir -r requirements.txt
      COPY . .
      EXPOSE 8000
      CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
    `,

  Springboot: `
      FROM eclipse-temurin:17-jre-alpine
      WORKDIR /app
      COPY target/*.jar app.jar
      EXPOSE 8080
      CMD ["java", "-jar", "app.jar"]
    `,

  Servlet: `
      FROM tomcat:10.1-alpine
      COPY target/*.war /usr/local/tomcat/webapps/
      EXPOSE 8080
      CMD ["catalina.sh", "run"]
    `,

  Vuejs: `
      FROM node:18-alpine AS build
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      RUN npm run build
  
      FROM nginx:alpine
      COPY --from=build /app/dist /usr/share/nginx/html
      EXPOSE 80
      CMD ["nginx", "-g", "daemon off;"]
    `,

  Nodejs: `
      FROM node:18-alpine
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      EXPOSE 3000
      CMD ["npm", "start"]
    `,

  Vite: `
      FROM node:18-alpine AS build
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      RUN npm run build
  
      FROM nginx:alpine
      COPY --from=build /app/dist /usr/share/nginx/html
      EXPOSE 80
      CMD ["nginx", "-g", "daemon off;"]
    `,

  Nuxtjs: `
      FROM node:18-alpine
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      EXPOSE 3000
      CMD ["npm", "run", "start"]
    `,

  PHP: `
      FROM php:8.2-apache
      COPY . /var/www/html/
      EXPOSE 80
    `,

  Go: `
      FROM golang:1.21-alpine AS build
      WORKDIR /app
      COPY . .
      RUN go build -o main .
      
      FROM alpine
      WORKDIR /app
      COPY --from=build /app/main .
      EXPOSE 8080
      CMD ["./main"]
    `,

  Java: `
      FROM eclipse-temurin:17-jre-alpine
      WORKDIR /app
      COPY target/*.jar app.jar
      EXPOSE 8080
      CMD ["java", "-jar", "app.jar"]
    `,

  Python: `
      FROM python:3.12-alpine
      WORKDIR /app
      COPY requirements.txt ./
      RUN pip install --no-cache-dir -r requirements.txt
      COPY . .
      EXPOSE 8000
      CMD ["python", "app.py"]
    `
  ,
  html: `
# Stage 1: Use an Alpine-based image for a small footprint
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the static website files (HTML, CSS, JS) to the web server's root directory
COPY . .

# Expose port 80 to allow access to the website
EXPOSE 80

# Use Nginx's default command to start the web server
CMD ["nginx", "-g", "daemon off;"]

    `,
  Other: `
    # NOTE: Your framework or technology wasn't detected, so we generated this generic Dockerfile.
# Please modify the base image, dependency installation, and commands based on your specific framework or language.

# Stage 1: Build the application (applicable to most frameworks)
# Use an appropriate lightweight image based on the language/framework (replace with your desired base image)
FROM node:18-alpine AS build  # Example: For Node.js. Replace with the language you are using

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files (e.g., package.json, requirements.txt, Gemfile, pom.xml)
COPY [dependency-file] .  # Replace [dependency-file] with the actual file like package.json, Gemfile, etc.

# Install dependencies (use the appropriate command based on the framework)
RUN [install-command]  # Replace with npm install, pip install, bundle install, etc.

# Copy the rest of the application source code
COPY . .

# Build the application (optional: applicable if your framework requires a build step)
RUN [build-command]  # Replace with npm run build, rake assets:precompile, etc.

# Stage 2: Run the application (applicable to most frameworks)
# Use a lightweight web server or runtime base image for serving the app
FROM nginx:alpine  # Replace with a suitable runtime image like nginx, python, openjdk, etc.

# Copy the build output or app code to the runtime environment
COPY --from=build /app/build /usr/share/nginx/html  # Adjust paths as needed for your app's structure

# Expose the relevant port (change based on framework)
EXPOSE 80  # Adjust based on your app's needs, like 3000 for Node.js or 8080 for Java apps

# Start the server or app (replace with relevant command for your framework)
CMD ["nginx", "-g", "daemon off;"]  # Adjust command for your framework

    `,
    C:`
# Use a lightweight image with GCC for compiling C programs
FROM gcc:12-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the C source code
COPY main.c .

# Compile the C program
RUN gcc -o myapp main.c

# Command to run the compiled application
CMD ["./myapp"]

    `
};
export default dockerFilesLatest;
