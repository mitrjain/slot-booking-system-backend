# Use the official PostgreSQL image
FROM postgres:latest

# Copy SQL script and CSV file to Docker container
COPY initializeTables.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
# EXPOSE 5433
