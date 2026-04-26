import { YoutubeTranscript } from 'youtube-transcript';

async function test() {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript('qGsiNIY-SBo');
    console.log(transcript.slice(0, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
