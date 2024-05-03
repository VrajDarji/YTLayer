import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  process.env.DATABASE_URL! ||
    "postgresql://YTLayer_owner:fX1txHl6CcUi@ep-patient-bar-a131mh11.ap-southeast-1.aws.neon.tech/YTLayer?sslmode=require"
);
const db = drizzle(sql, { schema });

export default db;
