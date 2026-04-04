# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bowfolios.spec.js >> Bowfolios Next.js Tests >> Test that filter page works
- Location: tests-playwright/bowfolios.spec.js:106:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Online Learning', { exact: true }) resolved to 2 elements:
    1) <div tabindex="-1" role="option" aria-disabled="false" aria-selected="false" class="css-d7l1ni-option" id="react-select-3-option-0">Online Learning</div> aka getByRole('option', { name: 'Online Learning' })
    2) <span class="me-1 badge bg-info">Online Learning</span> aka locator('span').filter({ hasText: 'Online Learning' })

Call log:
  - waiting for getByText('Online Learning', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - link "Logo Bowfolios" [ref=e5] [cursor=pointer]:
          - /url: /
          - generic [ref=e6]:
            - img "Logo" [ref=e7]
            - text: Bowfolios
        - generic [ref=e8]:
          - generic [ref=e9]:
            - link "Home" [ref=e10] [cursor=pointer]:
              - /url: /home
            - link "Profiles" [ref=e11] [cursor=pointer]:
              - /url: /profiles
            - link "Projects" [ref=e12] [cursor=pointer]:
              - /url: /projects
            - link "Interests" [ref=e13] [cursor=pointer]:
              - /url: /interests
            - link "Add Project" [ref=e14] [cursor=pointer]:
              - /url: /addproject
            - link "Filter" [ref=e15] [cursor=pointer]:
              - /url: /filter
          - button "peterleo@hawaii.edu" [ref=e18] [cursor=pointer]
    - main [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e22]:
          - generic [ref=e24]:
            - generic [ref=e25]: Filter by Interests
            - generic [ref=e26]:
              - log [ref=e28]: 1 result available.Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.
              - generic [ref=e29]:
                - generic [ref=e30]:
                  - generic [ref=e31]: Select...
                  - combobox [expanded] [active] [ref=e33]
                - img [ref=e37]
              - listbox [ref=e40]:
                - option "Online Learning" [ref=e41]
          - button "Filter" [ref=e43] [cursor=pointer]
        - generic [ref=e44]:
          - generic [ref=e46]:
            - img "Profile" [ref=e48]
            - generic [ref=e49]:
              - paragraph
            - heading "Projects" [level=5] [ref=e52]
          - generic [ref=e54]:
            - img "Profile" [ref=e56]
            - generic [ref=e57]:
              - paragraph
            - heading "Projects" [level=5] [ref=e60]
          - generic [ref=e62]:
            - img "Profile" [ref=e64]
            - generic [ref=e65]:
              - paragraph
            - heading "Projects" [level=5] [ref=e68]
          - generic [ref=e70]:
            - img "Profile" [ref=e72]
            - generic [ref=e73]:
              - paragraph
            - heading "Projects" [level=5] [ref=e76]
          - generic [ref=e78]:
            - img "Profile" [ref=e80]
            - generic [ref=e81]:
              - generic [ref=e82]: Peter Leong
              - generic [ref=e83]: Professor
              - paragraph [ref=e84]: I am a professor of Educational Technology
            - generic [ref=e86]: Online Learning
            - generic [ref=e87]:
              - heading "Projects" [level=5] [ref=e88]
              - img "Project" [ref=e89]
    - contentinfo [ref=e90]:
      - generic [ref=e92]:
        - text: The Bowfolios Project
        - text: University of Hawaii
        - text: Honolulu, HI 96822
        - link "https://bowfolios.github.io" [ref=e93] [cursor=pointer]:
          - /url: https://bowfolios.github.io
  - button "Open Next.js Dev Tools" [ref=e99] [cursor=pointer]:
    - img [ref=e100]
  - alert [ref=e103]
```

# Test source

```ts
  13  | 
  14  |   test('Test that signin and signout work', async ({ page }) => {
  15  |     await login(page, credentials.username, credentials.password);
  16  |     await logout(page);
  17  |     await expect(page.locator(`#${ComponentIDs.loginDropdown}`)).toBeVisible();
  18  |   });
  19  | 
  20  |   test('Test that signup page, then logout works', async ({ page }) => {
  21  |     const newUser = `user-${new Date().getTime()}@foo.com`;
  22  |     await page.goto('/signup');
  23  |     await expect(page.locator(`#${PageIDs.signUpPage}`)).toBeVisible();
  24  |     await page.fill(`#${ComponentIDs.signUpFormEmail}`, newUser);
  25  |     await page.fill(`#${ComponentIDs.signUpFormPassword}`, credentials.password);
  26  |     await page.click(`#${ComponentIDs.signUpFormSubmit}`);
  27  | 
  28  |     // After signup, we redirect to signin (as per our implementation)
  29  |     await expect(page.locator(`#${PageIDs.signInPage}`)).toBeVisible();
  30  | 
  31  |     await login(page, newUser, credentials.password);
  32  |     await logout(page);
  33  |   });
  34  | 
  35  |   test('Test that profiles page displays', async ({ page }) => {
  36  |     await page.goto('/profiles');
  37  |     await expect(page.locator(`#${PageIDs.profilesPage}`)).toBeVisible();
  38  |     // Check for some default content
  39  |     await expect(page.locator('text=Peter Leong')).toBeVisible();
  40  |   });
  41  | 
  42  |   test('Test that interests page displays', async ({ page }) => {
  43  |     await page.goto('/interests');
  44  |     await expect(page.locator(`#${PageIDs.interestsPage}`)).toBeVisible();
  45  |     await expect(page.locator('text=Online Learning')).toBeVisible();
  46  |   });
  47  | 
  48  |   test('Test that projects page displays', async ({ page }) => {
  49  |     await page.goto('/projects');
  50  |     await expect(page.locator(`#${PageIDs.projectsPage}`)).toBeVisible();
  51  |     await expect(page.locator(`#${PageIDs.projectsPage}`).locator('text=UH Online')).toBeVisible();
  52  |   });
  53  | 
  54  |   test('Test that home page display and profile modification works', async ({ page }) => {
  55  |     await login(page, credentials.username, credentials.password);
  56  |     await page.goto('/home');
  57  |     await expect(page.locator(`#${PageIDs.homePage}`)).toBeVisible();
  58  | 
  59  |     // Modify profile
  60  |     const newFirstName = `NewFirst-${new Date().getTime()}`;
  61  |     await page.fill(`#${ComponentIDs.homeFormFirstName}`, newFirstName);
  62  |     await page.keyboard.press('Enter');
  63  | 
  64  |     // Wait for success alert (sweetalert)
  65  |     await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
  66  |     await expect(page.getByText('Profile updated!')).toBeVisible();
  67  |     await page.click('.swal-button--confirm');
  68  | 
  69  |     // Verify modification on Profiles page
  70  |     await page.goto('/profiles');
  71  |     await expect(page.locator('text=' + newFirstName)).toBeVisible();
  72  | 
  73  |     // Reset back
  74  |     await page.goto('/home');
  75  |     await page.fill(`#${ComponentIDs.homeFormFirstName}`, credentials.firstName);
  76  |     await page.keyboard.press('Enter');
  77  |     await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
  78  |     await page.click('.swal-button--confirm');
  79  |   });
  80  | 
  81  |   test('Test that addProject page works', async ({ page }) => {
  82  |     await login(page, credentials.username, credentials.password);
  83  |     await page.goto('/addproject');
  84  |     await expect(page.locator(`#${PageIDs.addProjectPage}`)).toBeVisible();
  85  | 
  86  |     const projectName = `Project-${new Date().getTime()}`;
  87  |     await page.fill(`#${ComponentIDs.addProjectFormName}`, projectName);
  88  |     await page.fill(`#${ComponentIDs.addProjectFormPicture}`, 'http://example.com/pic.png');
  89  |     await page.fill(`#${ComponentIDs.addProjectFormHomePage}`, 'http://example.com');
  90  |     await page.fill(`#${ComponentIDs.addProjectFormDescription}`, 'A test project');
  91  | 
  92  |     // Select an interest using react-select
  93  |     await page.locator('input[id^="react-select-"]').first().click();
  94  |     await page.getByText('Online Learning', { exact: true }).click();
  95  | 
  96  |     await page.click(`#${ComponentIDs.addProjectFormSubmit}`);
  97  |     await expect(page.locator('.swal-modal')).toBeVisible({ timeout: 15000 });
  98  |     await expect(page.getByText('Project added successfully')).toBeVisible();
  99  |     await page.click('.swal-button--confirm');
  100 | 
  101 |     // Verify in projects page
  102 |     await page.goto('/projects');
  103 |     await expect(page.locator(`text=${projectName}`)).toBeVisible();
  104 |   });
  105 | 
  106 |   test('Test that filter page works', async ({ page }) => {
  107 |     await login(page, credentials.username, credentials.password);
  108 |     await page.goto('/filter');
  109 |     await expect(page.locator(`#${PageIDs.filterPage}`)).toBeVisible();
  110 | 
  111 |     // Filter by Online Learning using react-select
  112 |     await page.locator('input[id^="react-select-"]').first().click();
> 113 |     await page.getByText('Online Learning', { exact: true }).click();
      |                                                              ^ Error: locator.click: Error: strict mode violation: getByText('Online Learning', { exact: true }) resolved to 2 elements:
  114 |     await page.click(`#${ComponentIDs.filterFormSubmit}`);
  115 | 
  116 |     // Peter Leong should be visible
  117 |     await expect(page.locator('text=Peter Leong')).toBeVisible();
  118 |   });
  119 | 
  120 | });
  121 | 
```