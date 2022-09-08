import {Request} from 'itty-router';
import router from "./router";

export interface Env {
    KV: KVNamespace;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        return router.handle(request, env);
    },
};
