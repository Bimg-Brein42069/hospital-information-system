import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const AudioRecord = ({setData}) => {

  const addAudioElement = (blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      setData(base64Data);
    };
    reader.readAsDataURL(blob);
  };
  
  return (
    <>
      <AudioRecorder 
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        showVisualizer={true}
      />
    </>
  );
}

export default AudioRecord;
