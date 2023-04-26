import type { BaseLLMParams } from "langchain/llms";
import { LLM } from "langchain/llms/base";
import { generateCompletion } from "./llmChatPipeline";

export interface LLMChatInput extends BaseLLMParams {
  config: {
    cacheUrl: string;
    wasmUrl: string;
    maxGenLength: number;
    maxWindowLength: number;
    meanGenLength: number;
    kvConfig: { numLayers: number; shape: number[]; dtype: string };
    tokenizer: string;
    setInitProgress: (percent: number) => void;
  };
}

export class WebLLMChat extends LLM implements LLMChatInput {
  config: {
    cacheUrl: string;
    wasmUrl: string;
    maxGenLength: number;
    maxWindowLength: number;
    meanGenLength: number;
    kvConfig: { numLayers: number; shape: number[]; dtype: string };
    tokenizer: string;
    setInitProgress: (percent: number) => void;
  };

  _llmType() {
    return "webLlm";
  }

  constructor(fields: LLMChatInput) {
    super(fields ?? {});
    this.config = fields.config;
  }

  async _call(prompt: string, _stop?: string[]): Promise<string> {
    try {
      return await generateCompletion(prompt, this.config);
    } catch (err) {
      throw err;
    }
  }
}
