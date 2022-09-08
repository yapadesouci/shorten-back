import {Router} from "itty-router";
import {missing} from "itty-router-extras";
import shortenHandler from "./handlers/shorten";
import redirectHandler from "./handlers/redirect";

const router = Router();

router
    .options('/shorten', () => {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        });
    })
    .post('/shorten', shortenHandler)
    .get('/:slug', redirectHandler)
    .all('*', () => missing('Not found.'));

export default router;