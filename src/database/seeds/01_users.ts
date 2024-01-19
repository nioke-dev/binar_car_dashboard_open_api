import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('cars').del();
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      // id: "2625c868-55d3-4655-a3b1-f1e4416b39ce",
      id: "0a4b0eaf-0f40-45f9-9144-9855e09ecbb9",
      email: "nioke8090@gmail.com",
      password: "$2b$10$cc5xAEjLS6sZHyIGsRs/p.9/QMB4nnwRc7DGOsLcifHdPi9GYijgq", //rahasia -> this a password real
      isAdmin: true,
    },
    {
      //   id: "fe2aafe6-9118-4ae5-abc0-ee5b9a9e9fd6",
      id: "ad51a20a-b9bf-4b68-9c3b-5c22e092c5bc",
      email: "muhnurulmustofa@gmail.com",
      password: "$2b$10$.TqRTHddWr0RxTbvVFX5XuMvihHrBxsKG999OvBFEurA/6MNUV4Gy", //rahasia -> this a password real
      isAdmin: true,
    },
    {
      //   id: "046e5aac-3492-484a-9c2b-c827cdf3b61c",
      id: "1c2fe9c6-7bd5-485d-97ed-323259144d1e",
      email: "mustofan021@gmail.com",
      password: "$2b$10$b7Lwz6BwtHT71ohBOmMtv.jivri1n9VFzdsmWINEy4PMpUyGNNkuG", //rahasia -> this a password real
      isAdmin: true,
    },
    {
      id: "9cdef4fa-a3e0-4931-aba9-312450cf5070",
      email: "nurulmustofa@gmail.com",
      password: "$2b$10$J.DAdKi1x8SL78LGLSE0a.Z/viZ8fof2opDWYmEF1B8J9CwYBwHri", //Rahasia86 -> this a password real
      isAdmin: true,
    },
  ]);
}
