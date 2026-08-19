import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue';

// R2 stores rendered ISR pages (/shop, /punishments/*); the in-memory queue
// coordinates revalidations. Memory is per-isolate so a page may occasionally
// revalidate twice — harmless at this site's traffic.
export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
	queue: memoryQueue
});
