FROM nginx:alpine

RUN apk add --no-cache \
    php83 \
    php83-fpm \
    php83-mbstring \
    && ln -sf /usr/bin/php83 /usr/bin/php \
    && ln -sf /usr/sbin/php-fpm83 /usr/sbin/php-fpm \
    && rm -rf /usr/share/nginx/html/* \
    && rm -rf /var/cache/apk/*

COPY index.html script.js *.php /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY img/ /usr/share/nginx/html/img/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY php-fpm.conf /etc/php83/php-fpm.conf

EXPOSE 80

CMD php-fpm -D && nginx -g "daemon off;"