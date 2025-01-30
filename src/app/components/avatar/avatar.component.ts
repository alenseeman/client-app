import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'work-time-avatar',
  imports: [
    MatIcon,
    NgStyle,
    NgClass,
    NgIf
  ],
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
 fileURL: string = '';
 fileForUpload:any;
 fileChanged = output<any>();
  onFileChange(event: any) {
    const files = event.target.files as FileList;
    this.fileForUpload = event.target.files[0];
    if (files.length > 0) {
      this.fileURL = URL.createObjectURL(files[0]);
      this.fileChanged.emit(this.fileForUpload);
      this.resetInput();
    }
  }
  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }

}
