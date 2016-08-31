FROM zzrot/alpine-node

MAINTAINER ZZROT LLC <docker@zzrot.com>

#ENV VARIABLES
ENV GHOST_SOURCE /usr/src/app
ENV GHOST_CONTENT /var/lib/ghost
ENV GHOST_VERSION 0.10.0

#Change WORKDIR to ghost directory
WORKDIR $GHOST_SOURCE

RUN apk --no-cache add tar tini \
    && apk --no-cache add --virtual devs gcc make python wget unzip ca-certificates \
	&& wget -O ghost.zip "https://ghost.org/archives/ghost-${GHOST_VERSION}.zip" \
	&& unzip ghost.zip \
	&& npm install --production \
	&& rm ghost.zip \
	&& apk del devs \
	&& npm cache clean \
	&& rm -rf /tmp/npm*

#Copy over our configuration filename
COPY ./config.js $GHOST_SOURCE

#Copy over, and grant executable permission to the startup script
COPY ./entrypoint.sh /

RUN chmod +x /entrypoint.sh

#Run Init System
ENTRYPOINT [ "tini" ]

#Run Startup script
CMD [ "/entrypoint.sh" ]
