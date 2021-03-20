import { Validators } from '@angular/forms'

export const EmailValidation = [
  Validators.required, Validators.email
]

export const PassworkdValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50)
]