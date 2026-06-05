export function profileToForm(data) {
  if (!data) {
    return {
      first_name: '',
      last_name: '',
      birth_date: '',
      id_number: '',
      gender: '',
      university: '',
      faculty: '',
      specialty: '',
    };
  }

  const birthDate = data.birth_date ? String(data.birth_date).slice(0, 10) : '';

  return {
    first_name: data.first_name || '',
    last_name: data.last_name || '',
    birth_date: birthDate,
    id_number: data.id_number || '',
    gender: data.gender || '',
    university: data.university != null ? String(data.university) : '',
    faculty: data.faculty != null ? String(data.faculty) : '',
    specialty: data.specialty != null ? String(data.specialty) : '',
  };
}

export function formToProfilePayload(form) {
  return {
    first_name: form.first_name,
    last_name: form.last_name,
    birth_date: form.birth_date || null,
    id_number: form.id_number || null,
    gender: form.gender || null,
    university: form.university ? Number(form.university) : null,
    faculty: form.faculty ? Number(form.faculty) : null,
    specialty: form.specialty ? Number(form.specialty) : null,
  };
}
