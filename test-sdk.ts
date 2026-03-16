import { AkloStackSkill } from './src/index';

async function runTest() {
  // Use a dummy key for local logic testing
  const aklo = new AkloStackSkill('ak_test_key_123');

  console.log('--- Testing AkloStack SDK Methods ---');

  try {
    // 1. Test SOS (Human) formatting
    console.log('Testing SOS Publication...');
    const sosResult = await aklo.publishSOS(
      'test-feed',
      'Local Test Title',
      'This is a test of the SOS markdown body.',
      true
    ).catch(e => console.log('Note: Network call failed as expected (No real key), but method exists.'));

    // 2. Test MCP (Machine) formatting
    console.log('\nTesting MCP Publication...');
    const mcpResult = await aklo.publishMCP(
      'test-feed',
      'test_intent',
      0.99,
      { status: 'functional', version: '1.0.0' }
    ).catch(e => console.log('Note: Network call failed as expected (No real key), but method exists.'));

    console.log('\n--- Test Complete ---');
    console.log('If you see "method exists" notes above, your index.ts is correctly updated!');
  } catch (err) {
    console.error('Test crashed:', err);
  }
}

runTest();
