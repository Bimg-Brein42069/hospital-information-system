import React, { useState } from 'react';

const AudioPlayback = ({ audioData }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  const handleDecodeAudio = () => {
    // Decode base64 audio data
    const decodedData = atob(audioData);

    // Convert decoded data to binary format
    const binaryData = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      binaryData[i] = decodedData.charCodeAt(i);
    }

    // Create a Blob from binary data
    const blob = new Blob([binaryData], { type: 'audio/mp3' });

    // Create a URL object from the Blob
    const url = URL.createObjectURL(blob);

    // Set the URL to state for playback
    setAudioUrl(url);
  };

  return (
    <div>
      {audioData && 
      <>
      <button onClick={handleDecodeAudio}>Play Audio</button>
      {audioUrl && (
        <div>
        <p>Audio Playback:</p>
        <audio controls>
            <source src={audioUrl} type="audio/mp3" />
          </audio>
        </div>
        )}
      </>
      }
    </div>
  );
};

export default AudioPlayback;
