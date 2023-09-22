interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['End User'],
  customerRoles: ['Guest'],
  tenantRoles: ['End User'],
  tenantName: 'Organization',
  applicationName: 'Car Rental',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read vehicle information',
    'Read reservation information',
    'Read organization information',
    'Read user information',
  ],
  ownerAbilities: [
    'Manage reservations',
    'Read vehicle information',
    'Manage user profiles',
    'Read organization information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/86b8a8e5-03ef-4ceb-808e-51c158e9e7e9',
};
