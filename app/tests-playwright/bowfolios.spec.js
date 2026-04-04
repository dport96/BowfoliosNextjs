import { test, expect } from '@playwright/test';
import { ComponentIDs, PageIDs } from '../lib/ids';
import { login, logout } from './utils';

const credentials = { username: 'peterleo@hawaii.edu', password: 'foo', firstName: 'Peter', lastName: 'Leong' };

test.describe('Bowfolios Next.js Tests', () => {

  test('Test that landing page shows up', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(`#${PageIDs.landingPage}`)).toBeVisible();
  });

  test('Test that signin and signout work', async ({ page }) => {
    await login(page, credentials.username, credentials.password);
    await logout(page);
    await expect(page.locator(`#${ComponentIDs.loginDropdown}`)).toBeVisible();
  });

  test('Test that signup page, then logout works', async ({ page }) => {
    const newUser = `user-${new Date().getTime()}@foo.com`;
    await page.goto('/signup');
    await expect(page.locator(`#${PageIDs.signUpPage}`)).toBeVisible();
    await page.fill(`#${ComponentIDs.signUpFormEmail}`, newUser);
    await page.fill(`#${ComponentIDs.signUpFormPassword}`, credentials.password);
    await page.click(`#${ComponentIDs.signUpFormSubmit}`);

    // After signup, we redirect to signin (as per our implementation)
    await expect(page.locator(`#${PageIDs.signInPage}`)).toBeVisible();

    await login(page, newUser, credentials.password);
    await logout(page);
  });

  test('Test that profiles page displays', async ({ page }) => {
    await page.goto('/profiles');
    await expect(page.locator(`#${PageIDs.profilesPage}`)).toBeVisible();
    // Check for some default content
    await expect(page.locator('text=Peter Leong')).toBeVisible();
  });

  test('Test that interests page displays', async ({ page }) => {
    await page.goto('/interests');
    await expect(page.locator(`#${PageIDs.interestsPage}`)).toBeVisible();
    await expect(page.locator('text=Online Learning')).toBeVisible();
  });

  test('Test that projects page displays', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator(`#${PageIDs.projectsPage}`)).toBeVisible();
    await expect(page.locator(`#${PageIDs.projectsPage}`).locator('text=UH Online')).toBeVisible();
  });

  test('Test that home page display and profile modification works', async ({ page }) => {
    await login(page, credentials.username, credentials.password);
    await page.goto('/home');
    await expect(page.locator(`#${PageIDs.homePage}`)).toBeVisible();

    // Modify profile
    const newFirstName = `NewFirst-${new Date().getTime()}`;
    await page.fill(`#${ComponentIDs.homeFormFirstName}`, newFirstName);
    await page.keyboard.press('Enter');

    // Wait for success alert (sweetalert)
    await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Profile updated!')).toBeVisible();
    await page.click('.swal-button--confirm');

    // Verify modification on Profiles page
    await page.goto('/profiles');
    await expect(page.locator('text=' + newFirstName)).toBeVisible();

    // Reset back
    await page.goto('/home');
    await page.fill(`#${ComponentIDs.homeFormFirstName}`, credentials.firstName);
    await page.keyboard.press('Enter');
    await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
    await page.click('.swal-button--confirm');
  });

  test('Test that addProject page works', async ({ page }) => {
    await login(page, credentials.username, credentials.password);
    await page.goto('/addproject');
    await expect(page.locator(`#${PageIDs.addProjectPage}`)).toBeVisible();

    const projectName = `Project-${new Date().getTime()}`;
    await page.fill(`#${ComponentIDs.addProjectFormName}`, projectName);
    await page.fill(`#${ComponentIDs.addProjectFormPicture}`, 'http://example.com/pic.png');
    await page.fill(`#${ComponentIDs.addProjectFormHomePage}`, 'http://example.com');
    await page.fill(`#${ComponentIDs.addProjectFormDescription}`, 'A test project');

    // Select an interest using react-select
    await page.locator('input[id^="react-select-"]').first().click();
    await page.getByRole('option', { name: 'Online Learning' }).click();

    await page.click(`#${ComponentIDs.addProjectFormSubmit}`);
    await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Project added successfully')).toBeVisible();
    await page.click('.swal-button--confirm');

    // Verify in projects page
    await page.goto('/projects');
    await expect(page.locator(`text=${projectName}`)).toBeVisible();
  });

  test('Test that filter page works', async ({ page }) => {
    await login(page, credentials.username, credentials.password);
    await page.goto('/filter');
    await expect(page.locator(`#${PageIDs.filterPage}`)).toBeVisible();

    // Filter by Online Learning using react-select
    await page.locator('input[id^="react-select-"]').first().click();
    await page.getByRole('option', { name: 'Online Learning' }).click();
    await page.click(`#${ComponentIDs.filterFormSubmit}`);

    // Peter Leong should be visible
    await expect(page.locator('text=Peter Leong')).toBeVisible();
  });

});
