import { Hono } from "hono";

const model: BaseAiTextGenerationModels =
	"@cf/mistral/mistral-7b-instruct-v0.1";
const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
	return c.text("Hello World!");
});

app.get("/ai", async (c) => {
	const prompt = c.req.query("q") ?? "What can you do today?";
	const answer: AiTextGenerationOutput = await c.env.AI.run(model, {
		prompt,
		stream: false,
	});
	return c.json(answer);
});

export default app;
