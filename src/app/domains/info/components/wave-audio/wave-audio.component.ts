import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
CommonModule
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({required: true}) audioUrl!: string; //En vez de darle un valor por defecto poner esto audiUrl! para que no advierta
  @ViewChild('audio') container!: ElementRef; //Se obtiene la referencia del elemento html

  private audioRef!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit(){
    this.audioRef = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement //elemento al cual debemos decirle a la libreria donde generar el diagrama
    });

    this.audioRef.on('play', () => this.isPlaying.set(true));
    this.audioRef.on('pause', () => this.isPlaying.set(false));
  }

  playPause(){
    this.audioRef.playPause();
  }
}
