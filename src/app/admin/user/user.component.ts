import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showCreateForm = false;
  userForm!: FormGroup;
  roles: any[] = ['ADMIN', "USER"];
  avatarFile: File | undefined;
  avatarPreview: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      address: [''],
      phone: [''],
      avatar: [''],
      roleId: [null, Validators.required]
    });
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      const reader = new FileReader();
      reader.onload= () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file)
    }
  }

  removeAvatar() {
    this.avatarFile = undefined;
    this.avatarPreview = null;
  }
  onSubmit() {
    console.log('userForm',this.userForm);
    
    if (this.userForm.valid) {
      console.log('submit success');
      const formData = new FormData();
      formData.append('email', this.userForm.value.email);
      formData.append('password', this.userForm.value.password);
      formData.append('fullName', this.userForm.value.fullName);
      formData.append('address', this.userForm.value.address);
      formData.append('phone', this.userForm.value.phone);
      formData.append('roleId', this.userForm.value.roleId);
      if (this.avatarFile) {
        formData.append('avatar', this.avatarFile);
      }

      console.log('formData',formData);
      
    }
  }

}
