import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'
import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'
import httpsProxyAgent from 'https-proxy-agent';

const env = dotenv.config().parsed // 环境参数

console.log(env);

var agent = new httpsProxyAgent("http://localhost:7890");

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
  baseOptions: {
    httpsAgent: agent,
  }
})
const openai = new OpenAIApi(configuration)

export async function getOpenAiReply(prompt) {
  console.log('🚀🚀🚀 / prompt', prompt)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.9, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [' Human:', ' AI:'],
  }, {
    httpsAgent: agent,
  })

  const reply = markdownToText(response.data.choices[0].text)
  console.log('🚀🚀🚀 / reply', reply)
  return `${reply}\nvia ChatGPT`
}

function markdownToText(markdown) {
  return remark()
    .use(stripMarkdown)
    .processSync(markdown ?? '')
    .toString()
}
