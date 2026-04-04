import { expect } from '@playwright/test';
import { ComponentIDs } from '../src/lib/ids';

export async function login(page, email, password) {
  await page.goto('/signin');
  await page.fill(`#${ComponentIDs.signInFormEmail}`, email);
  await page.fill(`#${ComponentIDs.signInFormPassword}`, password);
  await page.click(`#${ComponentIDs.signInFormSubmit}`);
  // Wait for navigation or successful login indicator
  await expect(page.locator(`#${ComponentIDs.currentUserDropdown}`)).toBeVisible();
}

export async function logout(page) {
  await page.click(`#${ComponentIDs.currentUserDropdown}`);
  await page.click(`#${ComponentIDs.currentUserDropdownSignOut}`);
  // In NextAuth, signout usually redirects or shows a confirmation. 
  // Our implementation redirects to signin or landing.
}
