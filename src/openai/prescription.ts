import { Request } from "express";
import OpenAI from "openai";

const openai = new OpenAI();

const prescriptionPrompt = `Assume each meal takes 20 mins to finish.
When a medicine is prescribe to be taken after food then it needs to be taken immediately after the meal is finished.
If no time is mentioned then medicine has to be taken immediately after meal.
If a medicine is prescribed to be twice a day then it means morning and evening.
If a medicine is prescribed to be taken thrice a day then it means morning, afternoon and evening.
If a medicine is prescribed to be taken four times a day then it means morning, afternoon, evening and night.

I have been given a prescription as follows:
{{prescription}}

Based on this, and assuming that I eat my breakfast at 8:30 AM, lunch at 1:30 PM and dinner at 8:30 PM,
when should I taking the each of the medicines mentioned above? (each point of the prescription is a separate medicine)

Give how many times a day am I supposed to take it and then give valid timestamps for each of the time of the day
output should be in this format 
 
{
  "name": "medicine name",
  "frequency": 4,
  "timestamps": [
    "08:30:00",
    "13:30:00",
    "20:30:00",
    "22:30:00"
  ]
}

Answer should be a json array and nothing else.`;

export async function parsePrescription(req: Request) {
  const message = req.body.message;
  const prompt = prescriptionPrompt.replace("{{prescription}}", message);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}