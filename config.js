
var config = {}

config.host = process.env.HOST || "YOUR-DOCDB-URL";
config.authKey = process.env.AUTH_KEY || "YOUR-DOCDB-KEY";
config.databaseId = process.env.DATABASE || "YOUR-DOCDB-DATABASE";
config.collectionId = process.env.COLLECTION || "YOUR-DOCDB-COLLECTION";

module.exports = config;
