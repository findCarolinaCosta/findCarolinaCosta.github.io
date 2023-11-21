# Estágio 1: Construir a aplicação
FROM node:21.1.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /home/app

# Copie os arquivos do aplicativo para o contêiner
COPY . /home/app

# Crie um shell script para preparar o pnpm
RUN echo "#!/bin/sh" > prepare_pnpm.sh && \
    echo "export PNPM_VERSION=\$(node -p \"require('./package.json').engines.pnpm\")" >> prepare_pnpm.sh && \
    echo "corepack enable" >> prepare_pnpm.sh && \
    echo "corepack prepare pnpm@\$PNPM_VERSION --activate" >> prepare_pnpm.sh && \
    chmod +x prepare_pnpm.sh

# Execute o shell script
RUN ./prepare_pnpm.sh

# Estágio 2: Instalar dependências de produção
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Estágio 3: Construir o aplicativo
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Estágio 4: Executar a aplicação
FROM base

# Copie os arquivos de construção (gerados pelo Next.js) do estágio de construção
COPY --from=build /home/app/.next /home/app/.next

EXPOSE 3000

# Inicie o aplicativo Next.js
CMD [ "pnpm", "start" ]
