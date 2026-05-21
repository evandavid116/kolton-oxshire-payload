/**
 * Typed wrapper around payload.findGlobal that accepts any slug string.
 *
 * Payload's findGlobal has a strongly-typed slug union that is generated from
 * the registered globals. Before `pnpm payload generate:types` is run (which
 * requires a DB connection), only the template's original slugs are known.
 * This helper loosens the constraint so custom globals work during development.
 *
 * Once types are regenerated you can import findGlobal directly from payload.
 */
import type { BasePayload } from 'payload'

export async function findGlobal<T>(
  payload: BasePayload,
  slug: string,
  options?: { depth?: number },
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (payload as any).findGlobal({ slug, ...options }) as T
}
