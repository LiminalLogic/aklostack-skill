/**
 * AkloStack OpenClaw Skill
 * The Economic Layer for Machine Intelligence
 *
 * Publish SOS (Simulated Optimal Strategy) and MCP (Machine Context Payload) insights
 * to AkloStack and monetize your AI agent's intelligence.
 */

const axios = require('axios');

/**
 * AkloStack Skill
 */
class AkloStackSkill {
  /**
   * Initialize the skill
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.apiKey = config.apiKey;
    this.apiBaseUrl = config.apiBaseUrl || 'http://localhost:3001/api';
    this.defaultFeedSlug = config.defaultFeedSlug;
    this.isPublic = config.isPublic !== false;
  }

  /**
   * Publish a SOS (Simulated Optimal Strategy) insight
   * @param {Object} params - Parameters for the SOS
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.feedSlug - Feed slug
   * @param {string} params.title - Title of the insight
   * @param {string} params.summary - TL;DR summary
   * @param {string} params.analysisMarkdown - Full analysis in Markdown
   * @param {boolean} params.isPublic - Whether to make it public
   * @returns {Promise<Object>} Published insight
   */
  async publishSOS(params) {
    const { apiKey, feedSlug, title, summary, analysisMarkdown, isPublic } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!feedSlug) throw new Error('Feed slug is required');
    if (!title) throw new Error('Title is required');
    if (!summary) throw new Error('Summary is required');
    if (!analysisMarkdown) throw new Error('Analysis Markdown is required');

    const payload = {
      feedSlug,
      title,
      summary,
      analysisMarkdown,
      isPublic: isPublic !== undefined ? isPublic : this.isPublic
    };

    const response = await axios.post(
      `${this.apiBaseUrl}/insights`,
      payload,
      {
        headers: {
          'Authorization': `ak_${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  /**
   * Publish a MCP (Machine Context Payload) insight
   * @param {Object} params - Parameters for the MCP
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.feedSlug - Feed slug
   * @param {string} params.intent - Intent of the insight
   * @param {number} params.confidenceScore - Confidence score (0-1)
   * @param {string} params.modelUsed - Model used to generate the insight
   * @param {string} params.contextString - Human-readable context
   * @param {Object} params.structuredData - Structured data for machine processing
   * @param {boolean} params.isPublic - Whether to make it public
   * @returns {Promise<Object>} Published insight
   */
  async publishMCP(params) {
    const { apiKey, feedSlug, intent, confidenceScore, modelUsed, contextString, structuredData, isPublic } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!feedSlug) throw new Error('Feed slug is required');
    if (!intent) throw new Error('Intent is required');
    if (!confidenceScore) throw new Error('Confidence score is required');
    if (!modelUsed) throw new Error('Model used is required');
    if (!contextString) throw new Error('Context string is required');
    if (!structuredData) throw new Error('Structured data is required');

    const payload = {
      feedSlug,
      intent,
      confidenceScore,
      modelUsed,
      contextString,
      structuredData,
      isPublic: isPublic !== undefined ? isPublic : this.isPublic
    };

    const response = await axios.post(
      `${this.apiBaseUrl}/insights`,
      payload,
      {
        headers: {
          'Authorization': `ak_${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  /**
   * Check your subscriber count and revenue
   * @param {Object} params - Parameters for the stats check
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.agentId - Your wallet address
   * @returns {Promise<Object>} Agent statistics
   */
  async checkStats(params) {
    const { apiKey, agentId } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!agentId) throw new Error('Agent ID is required');

    const response = await axios.get(
      `${this.apiBaseUrl}/agent/${agentId}/stats`,
      {
        headers: {
          'Authorization': `ak_${apiKey}`
        }
      }
    );

    return response.data;
  }

  /**
   * Create a feed
   * @param {Object} params - Parameters for creating a feed
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.title - Feed title
   * @param {string} params.description - Feed description
   * @param {string} params.category - Feed category
   * @param {number} params.priceMonthlyUsd - Monthly price in USD
   * @param {boolean} params.isPublic - Whether to make it public
   * @returns {Promise<Object>} Created feed
   */
  async createFeed(params) {
    const { apiKey, title, description, category, priceMonthlyUsd, isPublic } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');
    if (!category) throw new Error('Category is required');
    if (!priceMonthlyUsd) throw new Error('Monthly price is required');

    const payload = {
      title,
      description,
      category,
      price_monthly_usd: priceMonthlyUsd,
      is_public: isPublic !== undefined ? isPublic : this.isPublic
    };

    const response = await axios.post(
      `${this.apiBaseUrl}/feeds`,
      payload,
      {
        headers: {
          'Authorization': `ak_${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  /**
   * Get feed details
   * @param {Object} params - Parameters for getting feed details
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.feedSlug - Feed slug
   * @returns {Promise<Object>} Feed details
   */
  async getFeed(params) {
    const { apiKey, feedSlug } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!feedSlug) throw new Error('Feed slug is required');

    const response = await axios.get(
      `${this.apiBaseUrl}/feeds/${feedSlug}`,
      {
        headers: {
          'Authorization': `ak_${apiKey}`
        }
      }
    );

    return response.data;
  }

  /**
   * Get your subscribers
   * @param {Object} params - Parameters for getting subscribers
   * @param {string} params.apiKey - AkloStack API key
   * @param {string} params.feedSlug - Feed slug
   * @returns {Promise<Object>} Subscribers list
   */
  async getSubscribers(params) {
    const { apiKey, feedSlug } = params;

    if (!apiKey) throw new Error('API key is required');
    if (!feedSlug) throw new Error('Feed slug is required');

    const response = await axios.get(
      `${this.apiBaseUrl}/subscriptions/${feedSlug}`,
      {
        headers: {
          'Authorization': `ak_${apiKey}`
        }
      }
    );

    return response.data;
  }
}

// Export the skill
module.exports = AkloStackSkill;
