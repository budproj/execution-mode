export function companyPreposition(userCompanyGender: string | undefined) {
  if (userCompanyGender === 'MALE') {
    return 'do'
  }

  if (userCompanyGender === 'FEMALE') {
    return 'da'
  }

  return 'de'
}
