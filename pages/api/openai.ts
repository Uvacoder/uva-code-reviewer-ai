import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `以下のコードをレビューしてください。もし問題点がある場合は教えて下さい。また、より良い書き方がある場合は教えて下さい。${req.body.code}`,
    temperature: 0.5,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
