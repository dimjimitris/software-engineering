// load environment variables
if (process.env.NODE_ENV === "production") {
    console.info("Environment: production");
    console.info("Environment variables are expected to already be defined");
} else {
    console.info("Environment: development");
    console.info("Environment variables are expected to be defined inside a .env file");
    await import("dotenv/config");
}

// create an object to hold all required environment variables
const env = {
    HTTP_HOST: process.env.HTTP_HOST,
    HTTP_PORT: process.env.HTTP_PORT,
    BASIC_COLUMN_URL: process.env.BASIC_COLUMN_URL,
    BASIC_LINE_URL: process.env.BASIC_LINE_URL,
    DEPENDENCY_WHEEL_URL: process.env.DEPENDENCY_WHEEL_URL,
    LINE_WITH_ANNOTATIONS_URL: process.env.LINE_WITH_ANNOTATIONS_URL,
    NETWORK_GRAPH_URL: process.env.NETWORK_GRAPH_URL,
    ORGANIZATION_URL: process.env.ORGANIZATION_URL,
    PIE_URL: process.env.PIE_URL,
    POLAR_URL: process.env.POLAR_URL,
    WORD_CLOUD_URL: process.env.WORD_CLOUD_URL,
};

// ensure all variables exist
for (const [key, val] of Object.entries(env)) {
    if (val === undefined) {
        console.error(`Environment variable '${key}' is missing`);
        process.exit(-1);
    }
}

// export that object as completely immutable
export default Object.freeze(env);