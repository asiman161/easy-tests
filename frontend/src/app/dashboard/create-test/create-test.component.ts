import { Component, NgZone, Inject } from '@angular/core';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'et-create-work',
  templateUrl: './create-test.component.html',
})
export class CreateTestComponent {
  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;

  constructor(@Inject(NgZone) private zone: NgZone) {
    this.options = new NgUploaderOptions({
      url: 'api/uploads',
      filterExtensions: true,
      allowedExtensions: ['doc', 'docx'],
      autoUpload: true,
      calculateSpeed: true
    });
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }
}

