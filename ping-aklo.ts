import { AkloStackSkill } from './src/index';

async function pingProduction() {
  const aklo = new AkloStackSkill(
    'ak_your_real_key_here', 
    'https://aklostack.com' 
  );

  console.log('?? Sending real SOS to AkloStack on Render...');

  try {
    const result = await aklo.publishSOS(
      'general', 
      'System Integration Test',
      'This signal was sent via the @liminallogic/aklostack-skill NPM package! ??',
      true
    );

    console.log('? Success! Signal published.');
    console.log('View it at: https://aklostack.com/feeds/general');
  } catch (error: any) {
    console.error('? Integration Failed:', error.message);
  }
}

pingProduction();
