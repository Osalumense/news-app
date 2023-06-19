# Use an official PHP image as the base image
FROM php:8.0-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install PHP extensions and other dependencies
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip unzip && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Install Composer (dependency manager for PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the Laravel application code to the container
COPY . .

# Install Laravel dependencies using Composer
RUN composer install

# Generate an application key (for example, you can run migrations here)
RUN php artisan key:generate
RUN php artisan migrate
RUN php artisan app:scrape

# Expose the port where the PHP-FPM server listens (default is 9000)
EXPOSE 8000

# Command to start the PHP-FPM server
CMD ["php-fpm"]
