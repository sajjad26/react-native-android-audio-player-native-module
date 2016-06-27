package com.reactnativemoduletutorial.myaudioplayer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.Map;

import android.media.MediaPlayer;
import android.media.AudioManager;

public class MyAudioPlayerModule extends ReactContextBaseJavaModule {

  private static MediaPlayer mediaPlayer = null;

  public MyAudioPlayerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

   @Override
   public String getName() {
     return "MyAudioPlayer";
   }

    @ReactMethod
    public void preparePlayer(String url) {
      try{
        if (mediaPlayer != null) {
          mediaPlayer.release();
          mediaPlayer = null;
        }
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        mediaPlayer.setDataSource(url);
        mediaPlayer.setLooping(true);
        mediaPlayer.prepareAsync();
      }catch(Exception e){  }
    }

    @ReactMethod
    public void setOnPreparedCallback(Callback onPrepared){
      final Callback onPreparedCallback = onPrepared;
      try{
        mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
          @Override
          public void onPrepared(MediaPlayer player) {
            try{
              onPreparedCallback.invoke(mediaPlayer.getDuration());
            }catch(Exception e){}
          }
        });
      }catch(Exception e){}
    }

    @ReactMethod
    public void play() {
      try{
        if (mediaPlayer != null) {
          if (!mediaPlayer.isPlaying()) {
            mediaPlayer.start();
          }
        }
      }catch(Exception e){}
    }

    @ReactMethod
    public void pause(){
      try{
        if (mediaPlayer != null) {
          if (mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
          }
        }
      }catch(Exception e){}
    }

}
