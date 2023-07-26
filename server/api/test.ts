import { db } from "../db/connection";

export default defineEventHandler(() => db.query.users.findMany());
