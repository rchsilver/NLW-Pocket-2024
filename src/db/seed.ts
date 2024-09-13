import { client, db } from ".";
import { goalCompletions, goals } from "./schema";
import dayjs from "dayjs";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

 const result = await db.insert(goals).values([
    { title: "Beber 2L de água", desiredWeeklyFrequency: 7 },
    { title: "Me exercitar", desiredWeeklyFrequency: 3 },
    { title: "Meditar", desiredWeeklyFrequency: 1 },
  ]).returning();
  
  const startOfWeek = dayjs().startOf("week");
  
  await db.insert(goalCompletions).values([
    { goalId: result[0].id, completedAt: startOfWeek.toDate() },
    { goalId: result[1].id, completedAt: startOfWeek.add(1, "day").toDate() },
  ]);
}

seed().finally(() => client.end());


