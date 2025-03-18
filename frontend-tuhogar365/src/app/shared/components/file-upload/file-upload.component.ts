/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true,
        },
    ],
    styleUrls: ['./file-upload.component.scss'],
    standalone: true,
    imports: [CommonModule,MatButtonModule, FormsModule,ReactiveFormsModule],
})
export class FileUploadComponent implements ControlValueAccessor {
  // @Input() progress;
  @Input() titulo:any;
  @Input() ver:boolean=true;
  @Output() foto = new EventEmitter<any>();
  @Output() url_img = new EventEmitter<any>();
  url_imagen : FormControl = new FormControl();
  imagen: any;
  objImagen: any;
  url:any;

  onChange!: Function;
  myFiles: string[] = [];


  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    this.host.nativeElement.value = "";
    this.myFiles = [];
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  getFileDetails(e:any) {
    this.myFiles = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  onSelectFile(event:any) {
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.imagen = event.target.files[0]
      reader.onload = (event) => {
        this.url = event?.target?.result;
      }
    }
    this.foto.emit({file: this.imagen,
                    url: this.url_imagen.value});
  }

}
