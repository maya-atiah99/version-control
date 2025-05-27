import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  notificationName: Yup.string().required(),
  notificationId: Yup.string(),
  notificationType: Yup.number().required(),
  applicationType: Yup.number().required(),
  notificationContent: Yup.string().required('Required'),
  subject: Yup.string().required(),
  emailSignatureId: Yup.string(),
  attachments: Yup.array().notRequired(),
});
