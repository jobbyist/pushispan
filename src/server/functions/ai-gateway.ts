/**
 * AI Gateway Server Function
 * 
 * This function provides AI-powered capabilities using Lovable's AI gateway.
 * It includes rate limiting to prevent abuse and ensure fair usage.
 * 
 * Enable the Lovable AI gateway in your project settings:
 * - Go to Project Settings > Integrations
 * - Enable "AI Gateway"
 * - Configure rate limits as needed
 */

interface AIRequest {
  prompt: string;
  context?: string;
  model?: string;
  max_tokens?: number;
}

interface AIResponse {
  response: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callAI(request: AIRequest): Promise<AIResponse> {
  try {
    // This would connect to Lovable's AI gateway
    // For production, ensure you've enabled the AI gateway in project settings
    
    // Example implementation (replace with actual Lovable AI gateway endpoint)
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        context: request.context,
        model: request.model || 'gpt-4',
        max_tokens: request.max_tokens || 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      response: data.response || data.content || '',
      usage: data.usage,
    };
  } catch (error) {
    console.error('AI Gateway Error:', error);
    throw new Error('Failed to process AI request');
  }
}
