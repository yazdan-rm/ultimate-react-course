import _ from '@lodash';
import mockApi from '../mock-api.json';

const accountSettings = mockApi.components.examples.settings_account.value;
const securitySettings = mockApi.components.examples.settings_security.value;
const planBillingSettings = mockApi.components.examples.settings_plan_billing.value;
const notificationsSettings = mockApi.components.examples.settings_notifications.value;
let teamSettings = mockApi.components.examples.settings_team.value;
export const settingsApiMocks = (mock) => {
	/**
	 * GET account settings/
	 */
	mock.onGet('/settings/account').reply(() => {
		return [200, accountSettings];
	});
	/**
	 * UPDATE account settings
	 */
	mock.onPut('/settings/account').reply((config) => {
		_.assign(accountSettings, JSON.parse(config.data));
		return [200, accountSettings];
	});
	/**
	 * GET team settings/
	 */
	mock.onGet('/settings/team').reply(() => {
		return [200, teamSettings];
	});
	/**
	 * UPDATE team settings
	 */
	mock.onPut('/settings/team').reply((config) => {
		teamSettings = JSON.parse(config.data);
		return [200, teamSettings];
	});
	/**
	 * GET plan and billing settings/
	 */
	mock.onGet('/settings/plan-billing').reply(() => {
		return [200, planBillingSettings];
	});
	/**
	 * UPDATE plan and billing settings
	 */
	mock.onPut('/settings/plan-billing').reply((config) => {
		_.assign(planBillingSettings, JSON.parse(config.data));
		return [200, planBillingSettings];
	});
	/**
	 * GET notifications settings/
	 */
	mock.onGet('/settings/notifications').reply(() => {
		return [200, notificationsSettings];
	});
	/**
	 * UPDATE notifications settings
	 */
	mock.onPut('/settings/notifications').reply((config) => {
		_.assign(notificationsSettings, JSON.parse(config.data));
		return [200, notificationsSettings];
	});
	/**
	 * GET security settings
	 */
	mock.onGet('/settings/security').reply(() => {
		const response = { ...securitySettings, currentPassword: '', newPassword: '' };
		return [200, response];
	});
	/**
	 * UPDATE security settings
	 */
	mock.onPut('/settings/security').reply((config) => {
		const newVal = JSON.parse(config.data);

		if (newVal?.currentPassword === '' && newVal?.newPassword !== '') {
			return [400, [{ name: 'currentPassword', message: 'Fill in the current password' }]];
		}

		if (newVal?.currentPassword !== '' && newVal?.newPassword === '') {
			return [400, [{ name: 'newPassword', message: 'Fill in the new password' }]];
		}

		if (
			newVal?.currentPassword !== '' &&
			newVal?.currentPassword !== securitySettings.currentPassword &&
			newVal?.newPassword !== ''
		) {
			return [400, [{ name: 'currentPassword', message: 'Current password is incorrect' }]];
		}

		if (
			newVal?.newPassword &&
			newVal?.newPassword !== '' &&
			newVal?.currentPassword === securitySettings.currentPassword
		) {
			_.assign(securitySettings, { ...newVal, currentPassword: newVal.newPassword, newPassword: '' });
		} else {
			_.assign(securitySettings, _.omit(newVal, ['currentPassword']));
		}

		const response = { ...securitySettings, currentPassword: '', newPassword: '' };
		return [200, response];
	});
};
