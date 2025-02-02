## Python

- [install python](https://kinsta.com/knowledgebase/install-python/)

## Ollama

- [library](https://ollama.com/library)
- [github - api doc](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [msty - UI](https://msty.app/)

```shell
ollama list

ollama run llama3.2

/clear

>>> /help
Available Commands:
  /set            Set session variables
  /show           Show model information
  /load <model>   Load a session or model
  /save <model>   Save your current session
  /clear          Clear session context
  /bye            Exit
  /?, /help       Help for a command
  /? shortcuts    Help for keyboard shortcuts

```

### show info

```shell
>>> /show info
  Model
    architecture        llama
    parameters          3.2B
    context length      131072
    embedding length    3072
    quantization        Q4_K_M
```

1. Model Architecture (模型架构)
   llama —— 该模型基于 LLaMA (Large Language Model Meta AI) 架构，这是一种由 Meta (Facebook) 开发的高级大语言模型架构，优化了推理能力和计算效率。
   The model is based on the LLaMA (Large Language Model Meta AI) architecture, developed by Meta (Facebook). It is optimized for inference capabilities and computational efficiency.
2. Parameters (参数数量)
   3.2B —— 该模型拥有 3.2 billion (32 亿) 个参数，参数越多通常意味着更强的理解能力，但也增加了计算资源的需求。
   The model has 3.2 billion parameters. More parameters generally lead to better understanding but require more computational resources.
3. Context Length (上下文长度)
   131072 —— 该模型支持 131,072 个 token 的上下文窗口，表示它可以在单次处理过程中记住更长的对话历史或文档内容。
   The model supports a context window of 131,072 tokens, meaning it can remember a longer conversation history or document in a single process.
4. Embedding Length (嵌入向量长度)
   3072 —— 该模型的词向量（embedding）长度为 3072 维，用于将文本转换为高维数值表示，以便进行计算和推理。
   The model has an embedding size of 3072 dimensions, which represents how words are transformed into high-dimensional numerical representations for computation and reasoning.
5. Quantization (量化方式)
   Q4_K_M —— 该模型采用 Q4_K_M 量化，这是一种 4-bit 量化技术，能够在降低存储需求和计算成本的同时保持较高的推理精度。
   The model uses Q4_K_M quantization, a 4-bit quantization technique that reduces storage and computation costs while maintaining high inference accuracy.

## Python env

```shell
pip3 install ollama
```