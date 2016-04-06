FROM skilgarriff/alpine_node

#Environment Variables
ENV GHOST_SOURCE /usr/src/ghost
ENV GHOST_VERSION 0.7.6
ENV GHOST_CONTENT /var/lib/ghost

WORKDIR $GHOST_SOURCE


RUN apk add -U wget ca-certificates python make gcc libc-dev g++ \
    && apk upgrade \
    && adduser ghost -D -h /ghost \
    && wget -q https://ghost.org/zip/ghost-${GHOST_VERSION}.zip -O ghost.zip \
    && unzip -q ghost.zip \
    && npm install --production \
    && apk del wget ca-certificates python make gcc libc-dev g++ \
    && rm ghost.zip \
    && npm cache clean \
    && rm -rf /var/cache/apk/* /tmp/* /root/.node-gyp

RUN mkdir -p "$GHOST_CONTENT" && chown -R ghost "$GHOST_CONTENT"

VOLUME $GHOST_CONTENT

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 2368
CMD ["npm", "start"]
