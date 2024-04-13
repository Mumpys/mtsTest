import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class VideoPage extends BasePage {
  readonly videoCategoryLocator: Locator;
  readonly searchVideoField: Locator;
  readonly findButton: Locator;
  readonly sidebarVideoButton: Locator;
  readonly filledVideoIcon: Locator;
  readonly selectedVideoCategory: Locator;
  readonly videoCard: Locator;

  constructor(page: Page, path: string) {
    super(page, path);

    this.videoCategoryLocator = this.page.getByTestId(
      'floor-title-long_video_floor'
    );
    this.searchVideoField = this.page.getByTestId('search-input');
    this.findButton = this.page.getByLabel('Кнопка Найти');
    this.sidebarVideoButton = this.page.getByLabel('Видео', { exact: true });
    this.filledVideoIcon = this.sidebarVideoButton.locator(
      '//div[@class="navigation-tab__iconWrapper-2N"]/*/*'
    );
    this.selectedVideoCategory = this.sidebarVideoButton.locator('//li');
    this.videoCard = this.page.getByTestId('video-card-clickable');
  }

  async checkChangeVideoButton() {
    const filedAttr = await this.filledVideoIcon.getAttribute('xlink:href');

    await this.filledVideoIcon.waitFor({ state: 'visible' });

    expect(filedAttr.includes('video_showcase_filled')).toBeTruthy();
    await expect(this.selectedVideoCategory).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  async searchVideoByText(text: string) {
    await this.searchVideoField.fill(text);
    await this.findButton.click();
  }

  async choosePreset(presetName: string) {
    await this.page.getByRole('button').filter({ hasText: presetName }).click();
  }

  async clickFirstVideo() {
    await this.videoCard.first().click();
  }
}
