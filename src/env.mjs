import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 */
const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  SESSION_PASSWORD: z.string().min(32),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  CLOUDFLARE_ACCOUND_ID: z.string(),
  CLOUDFLARE_TOKEN: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  CLOUDFLARE_STREAM_TOKEN: z.string(),
  CLOUDFLARE_CODE: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_PORT: z.string(),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string(),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string(),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_SECRET: z.string(),
  NEXT_PUBLIC_GOOGLE_REDIRECT_URI: z.string().url(),
  NEXT_PUBLIC_GITHUB_ID: z.string(),
  NEXT_PUBLIC_CLOUDFLARE_CODE: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_PASSWORD: process.env.SESSION_PASSWORD,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  CLOUDFLARE_ACCOUND_ID: process.env.CLOUDFLARE_ACCOUND_ID,
  CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  CLOUDFLARE_STREAM_TOKEN: process.env.CLOUDFLARE_STREAM_TOKEN,
  CLOUDFLARE_CODE: process.env.CLOUDFLARE_CODE,
  NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
  NEXT_PUBLIC_GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
  NEXT_PUBLIC_GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
  NEXT_PUBLIC_CLOUDFLARE_CODE: process.env.NEXT_PUBLIC_CLOUDFLARE_CODE,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
