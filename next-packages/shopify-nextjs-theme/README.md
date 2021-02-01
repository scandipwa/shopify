# Descision

## React router issues. Next will not work it.

**Workaround**:

- https://colinhacks.com/essays/building-a-spa-with-nextjs

But this solution eliminates pre-rendering idea, as instead of Router we return `null` on server.

> We must remove router from code :C

## Routing is static

Yes, routing is baed on file-system. This means, we would need to develop an abstraction over it to map slugs to scripts.

**Maybe, these help**:

- https://github.com/fridays/next-routes

## Webpack configs have to be adjusted again!

Seems like the webpack configurations for NextJS must be adjusted again, like we did it for CRA.
