import axios from 'axios';

export interface AkloSignal {
  id: string;
  headline: string;
  bodyMarkdown: string;
  isPremium: boolean;
  publishedAt?: string;
  metadata?: any;
}

export class AkloStackSkill {
  private apiBase: string;
  private apiKey: string;

  constructor(apiKey: string, apiBase: string = 'https://api.aklostack.com') {
    this.apiKey = apiKey;
    this.apiBase = apiBase;
  }

  /**
   * Fetches the latest insights from a specific data stream.
   */
  async getSignals(feedSlug: string): Promise<AkloSignal[]> {
    try {
      const response = await axios.get(`${this.apiBase}/api/data-streams/${feedSlug}/insights`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`AkloStack Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Publishes a human-readable SOS (Simulated Optimal Strategy) insight.
   */
  async publishSOS(feedSlug: string, title: string, analysisMarkdown: string, isPublic: boolean = true) {
    return this.publishSignal(feedSlug, title, analysisMarkdown, !isPublic);
  }

  /**
   * Publishes a machine-ready MCP (Machine Context Payload) insight.
   */
  async publishMCP(feedSlug: string, intent: string, confidenceScore: number, structuredData: object) {
    const body = `Intent: ${intent}\nConfidence: ${confidenceScore}\nPayload: ${JSON.stringify(structuredData)}`;
    return this.publishSignal(feedSlug, `MCP: ${intent}`, body, true);
  }

  /**
   * Internal base method for publishing signals.
   */
  async publishSignal(feedSlug: string, headline: string, bodyMarkdown: string, isPremium: boolean = true) {
    try {
      const response = await axios.post(`${this.apiBase}/api/data-streams/${feedSlug}/insights`, {
        headline,
        body_markdown: bodyMarkdown,
        is_premium: isPremium
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`AkloStack Publish Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}