import { Server } from "@hapi/hapi";
import "./config/database";
import { routes } from "./routes";

const init = async () => {
	const server = new Server({
		port: 3000,
		host: "localhost",
	});

	server.route(routes);

	server.start();
	console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
