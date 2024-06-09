declare namespace App {
    interface Locals { }

    interface Platform {
        env: {
            COUNTER: DurableObjectNamespace;
            "linkshortener-LINKS": KVNamespace;
        };
        context: {
            waitUntil(promise: Promise<unknown>): void;
        };
        caches: CacheStorage & { default: Cache }
    }

    interface Session { }

    interface Stuff { }
}