import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { createGoal } from "../functions/create-goal";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  "/goals",
  {
    schema: {
      body: z.object({ title: z.string(), desiredWeeklyFrequency: z.number() }),
    },
  },
  async (request, reply) => {
    const { title, desiredWeeklyFrequency } = request.body;
    await createGoal({
      title: title,
      desiredWeeklyFrequency: desiredWeeklyFrequency,
    });

    reply.send({ success: true, message: "Goal created!" });
  }
);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
