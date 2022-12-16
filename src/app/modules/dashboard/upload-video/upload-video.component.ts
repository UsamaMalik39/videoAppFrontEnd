import { Router } from '@angular/router';
import { FileService } from './../../../services/file/file.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {
  userName:string='';
  constructor(private _fileService:FileService,private fb: FormBuilder,
    private router:Router, private _userService:UserServiceService) { }
  uploadFileForm: FormGroup = new FormGroup({});
  formData = new FormData();
  thumbnailFile:any={};
  videoLoading:boolean=false;
  ngOnInit(): void {
    this.initializeForm();
    this.userName=this._userService.legalName;
  }

  uploadFile(){
    this.videoLoading=true;
    this.formData.append('thumbnail',this.thumbnailFile)
    this._fileService.uploadFile(this.formData).subscribe((x)=>{
      if(x.success && x.data){
        this.uploadFileForm.patchValue({'url':x.data.dataURL, 'thumbnail':x.data.thumbnailURL})
        this._fileService.addURL(this.uploadFileForm.value).subscribe((y)=>{
          if(y.success){
            this.videoLoading=false;
            this.initializeForm()
            this.router.navigate(['dashboard'])
          }
        })
      }

    })
  }

  initializeForm(){
    this.uploadFileForm = this.fb.group({
      title: [null, [Validators.required]],
      producer: [null, [Validators.required]],
      genre: ["", [Validators.required]],
      rating: ["", [Validators.required]],
      url: [null],
      thumbnail: [null]
    });


  }
  uploadMediaFile(event:any){
    const files = event.target.files;
    this.formData=  new FormData();
    this.formData.append('file', files[0])
  }
  uploadThumbnailFile(event:any){
    const files = event.target.files;
    this.thumbnailFile=files[0];
  }

}
