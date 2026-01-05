A Git-based, mobile friendly, static publishing system.

the template for this project was created with the command:

npx create-next-app -e with-supabase

this gives us Supabase and Supbase auth out of the box.

MDXBlog has been updated to incorporate the latest features of **Next.js 15**. The new release focuses on performance, security, and modern development capabilities.

**Key Updates in Next.js 15:**

- **Async Request APIs**: Breaking change to caching—fetch requests and GET routes are no longer cached by default. Improves control over rendering and caching.
- **React 19 Support**: Next.js 15 supports React 19, introducing improved hydration error handling and experimental React Compiler integration. However, we have opted to downgrade to React 18.3.1 to ensure compatibility with a wider range of dependencies.
- **Turbopack Dev**: Faster builds and stable development performance improvements.
- **unstable_after API**: Experimental API to execute code after response streaming.
- **Caching Semantics**: Updated caching for fetch, GET handlers, and client navigation.
- **instrumentation.js API**: Server lifecycle observability for debugging and monitoring.
- **next.config.ts**: Full TypeScript support for configuration files.
- **Server Actions Security**: Secure endpoints and automatic cleanup of unused actions.

Kudos to contributors:

**Jason Ventresca** [https://github.com/jasonventresca](https://github.com/jasonventresca)
