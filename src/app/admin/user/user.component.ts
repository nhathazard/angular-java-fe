import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  showCreateForm = false;
  userForm!: FormGroup;
  roles: any[] = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'USER' },
  ];
  avatarFile: File | undefined;
  avatarPreview: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      address: [''],
      phone: [''],
      avatar: [''],
      role: [null, Validators.required],
    });
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      console.log('file', file);
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post('http://localhost:8080/admin/user/upload', formData, {
          responseType: 'text',
        })
        .subscribe((value) => {
          console.log('nhat', value);

          this.userForm.patchValue({ avatar: value });
        });
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeAvatar() {
    this.avatarFile = undefined;
    this.avatarPreview = null;
  }
  onSubmit() {
    const body = this.userForm.value;
    console.log('body', body);
    this.http
      .post('http://localhost:8080/admin/user/create', body)
      .subscribe((value) => {
        console.log('value', value);
      });
  }
}
