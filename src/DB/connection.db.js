// DB CONNECTION

import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI, PORT } from "./../config.js";

export const client = new MongoClient(DB_URI);

export const bootstrapDB = async (app) => {
  try {
    await client.connect();
    console.log(`DB Connected Successfully`);
    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
  } catch (error) {
    console.log(`Fail to connect on DB`);
    console.log({ error });
  }
};

export const db = client.db(DB_NAME);
