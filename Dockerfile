FROM nginx:alpine

RUN apk add --no-cache \
    php82 \
    php82-fpm \
    php82-json \
    php82-mbstring \
    && ln -s /usr/bin/php82 /usr/bin/php \
    && rm -rf /usr/share/nginx/html/* \
    && rm -rf /var/cache/apk/*

COPY index.html script.js *.php /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY img/ /usr/share/nginx/html/img/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY php-fpm.conf /etc/php82/php-fpm.conf

EXPOSE 80

CMD php-fpm82 -D && nginx -g "daemon off;"