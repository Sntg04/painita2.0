// utils/validateFields.js
export function validateStep1(data) {
  const errors = [];
  if (!data.first_name) errors.push('Primer nombre es obligatorio');
  if (!data.last_name) errors.push('Primer apellido es obligatorio');
  if (!data.email) errors.push('Correo es obligatorio');
  if (!data.document_number) errors.push('Número de cédula es obligatorio');
  if (!data.birth_date) errors.push('Fecha de nacimiento es obligatoria');
  if (!data.document_issue_date) errors.push('Fecha de expedición es obligatoria');
  if (!data.telefono) errors.push('Número de celular es obligatorio');
  return errors;
}
