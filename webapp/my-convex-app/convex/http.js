import { httpRouter } from "convex/server";
import { httpEndpoint } from "./_generated/server";
const http = httpRouter();

const postResponse = httpEndpoint(async ({ runMutation }, request) => {
	const {url, table} = await request.json()
	
})

http.route({
	path: "/postResponse",
	method: "POST",
	handler: postResponse,
})

export default http;