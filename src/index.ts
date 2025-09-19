import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "Hello",
    version: "0.0.1-alpha",
    capabilities: { resources: {}, tools: {} },
});

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

function hello(name: string): string {
    return `Hello ${capitalize(name)}`;
}

server.tool("sayHello", "This returns a greeting for a name.", {
    name: z.string().describe("The name to greet"),
}, ({ name }) => {
    return { content: [{ type: "text", text: `Hello ${capitalize(name)}` }] };
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Hello MCP is online");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
