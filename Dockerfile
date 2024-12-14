FROM --platform=$BUILDPLATFORM node:20 AS builder

WORKDIR /

COPY package*.json ./

RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) && \
    npm config set //npm.pkg.github.com/:_authToken=${NPM_TOKEN} && \
    npm config set @mpuertadev:registry=https://npm.pkg.github.com/ --location=global && \
    npm install

COPY . .

FROM --platform=$TARGETPLATFORM node:20-slim

WORKDIR /

COPY --from=builder / .

EXPOSE 3002

RUN apt-get update && apt-get install -y wget && \
    ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        wget https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_0.139.4_linux-amd64.deb; \
    elif [ "$ARCH" = "arm64" ]; then \
        wget https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_0.139.4_linux-arm64.deb; \
    else \
        echo "Unsupported architecture: $ARCH"; exit 1; \
    fi && \
    dpkg -i hugo_0.139.4_linux-*.deb && \
    rm hugo_0.139.4_linux-*.deb

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN hugo

ENTRYPOINT ["docker-entrypoint.sh"]
CMD [ "npm", "start" ]