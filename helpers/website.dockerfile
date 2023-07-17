# Rebuild the source code only when needed
FROM node:19.8-alpine AS deps

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next._config.js if you are NOT using the default configuration
COPY --from=builder /app/dist/apps/website/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/website/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/website/.next ./.next
COPY ./apps/website/package.json ./package.json

RUN yarn install --production --ignore-scripts --prefer-offline

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
