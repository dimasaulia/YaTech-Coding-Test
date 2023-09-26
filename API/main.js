const { app } = require("./src/app/app");
const { logger } = require("./src/app/logging");
const PORT = 8000;
app.listen(PORT, () => {
    logger.info(`🤘 SERVER RUNNING IN PORT ${PORT}`);
});
