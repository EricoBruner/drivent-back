import { request } from '@/utils/request';

export default async function validateZipCode(cep: string) {
  const regexValidateZipCode = /(^\d{8}$)|(^\d{5}[-]\d{3}$)/;

  if (!regexValidateZipCode.test(cep)) {
    return { erro: true, message: 'ZIP CODE must be in a valid format!' };
  }

  const result = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);

  if (result.data.erro) {
    return { erro: true, message: 'ZIP CODE not found!' };
  }

  return result.data;
}
