import { Component,Input,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebMaterialModule } from 'app/webmaterial.module';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imprimir-pdf',
  standalone: true,
  imports: [WebMaterialModule],
  templateUrl: './imprimir-pdf.component.html',
  styleUrl: './imprimir-pdf.component.scss'
})
export class ImprimirPdfComponent implements OnInit{
  @Input() title!: string;
  @Input() pdfRuta!: string;

  modalOptions: NgbModalOptions = {};
  urlSafe!: SafeResourceUrl;

  constructor(
    public activeModal: NgbActiveModal,
    public sanitizer: DomSanitizer
  ) {
    this.modalOptions = {
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
   }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfRuta);

  }
}
