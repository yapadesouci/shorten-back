import {Request} from "itty-router";
import {error} from "itty-router-extras";
import {nanoid} from "nanoid";
import {Env} from "../index";

const shortenHandler = async (request: Request, env: Env) => {
    const requestBody = await request.json?.();
    if (!requestBody?.url) {
        return error(400, 'Missing `url` field.');
    }

    const slug = nanoid();

    await env.KV.put(slug, requestBody.url, {expirationTtl: 3600});

    return new Response(JSON.stringify({
        "url": `${new URL(request.url).origin}/${slug}`
    }), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        },
        status: 200
    });
}

export default shortenHandler;