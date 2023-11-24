import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  const PASWORD = "rahasia";
  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      email: "admin@example.com",
      password: await bcrypt.hash(PASWORD, 8),
      level: "super_admin",
    },
  ]);
}
