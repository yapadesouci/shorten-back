import {Request} from "itty-router";
import {error, missing} from "itty-router-extras";
import {Env} from "../index";

const redirectHandler = async (request: Request, env: Env) => {
    const {params} = request

    if (!params?.slug) {
        return error(400, 'Missing `slug` param.');
    }

    let link = await env.KV.get(params.slug);
    if (!link) {
        return missing(`Slug '${params.slug}' not found.`);
    }

    return new Response(null, {
        headers: {Location: link},
        status: 301
    });
}

export default redirectHandler;