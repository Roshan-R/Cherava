# Use the offical Bun image
FROM jarredsumner/bun:edge

# Set the Docker working directory as /usr/src/app
# Copy everything from here into Docker's /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install the dependencies (Bao.js)
RUN bun install

# The port that Bao.js will listen on
EXPOSE 443

# Run the Bao.js webserver
CMD bun run index.ts
