# Estágio 1: Construir a aplicação
FROM node:21.1.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /home/app

# Copie os arquivos do aplicativo para o contêiner
COPY . /home/app

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
