const server = require("./server");
const logger = require("./utils/logger");

const port = process.env.PORT || 5000;

server.listen(port, () => {
	logger.info(`[Server] Listening on: http://localhost:${port}`);
});
