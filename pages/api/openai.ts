import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { EnTexts } from "../../src/locales/en";
import { JaTexts } from "../../src/locales/ja";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ result: "Only POST requests allowed" });
  }
  if (!req.body?.code) {
    res.status(400).json({ result: "Code is required" });
  }
  const locale = req.cookies.locale;
  const texts = locale === "ja" ? JaTexts : EnTexts;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${texts.statementForReview}\n${req.body.code}`,
      temperature: 0.5,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch {
    res
      .status(500)
      .json({ result: "We are sorry but something wrong with this service" });
  }
}
