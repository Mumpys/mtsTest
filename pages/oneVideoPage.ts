import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class OneVideoPage extends BasePage {
  readonly videoPleer: Locator;
  readonly videoControlPanel: Locator;

  readonly timelineBar: Locator;
  readonly previousVideoButton: Locator;
  readonly pauseButton: Locator;
  readonly nextVideoButton: Locator;
  readonly muteButton: Locator;
  readonly videoSettingsButton: Locator;
  readonly subtitlesVideoButton: Locator;
  readonly fullScreenButton: Locator;

  constructor(page: Page, path: string) {
    super(page, path);

    this.videoPleer = this.page.getByLabel('Видеоплеер');
    this.videoControlPanel = this.videoPleer.locator(
      '//div[@class="zen-ui-video-video-player__control-toggle _is-controls-visible"]'
    );
    this.timelineBar = this.page.getByTestId('timeline-clickable-zone');
    this.previousVideoButton = this.page.getByLabel('Предыдущее видео');
    this.pauseButton = this.page.getByLabel('Пауза');
    this.nextVideoButton = this.page.getByLabel('Следующее видео');
    this.muteButton = this.page.getByLabel('Выключить звук');
    this.videoSettingsButton = this.page.getByLabel(
      'Настройки воспроизведения видео'
    );
    this.subtitlesVideoButton = this.page.getByLabel('Субтитры');
    this.fullScreenButton = this.page.getByLabel('Полноэкранный просмотр');
  }

  async checkVideoPleerElements() {
    await this.videoPleer.hover({ force: true });
    await this.videoControlPanel.waitFor({ state: 'visible' });
    await this.timelineBar.waitFor({ state: 'visible' });
    await this.previousVideoButton.waitFor({ state: 'visible' });
    await this.pauseButton.waitFor({ state: 'visible' });
    await this.nextVideoButton.waitFor({ state: 'visible' });
    await this.videoSettingsButton.waitFor({ state: 'visible' });
    await this.subtitlesVideoButton.waitFor({ state: 'visible' });
    await this.fullScreenButton.waitFor({ state: 'visible' });
  }

  async clickFullScreen() {
    await this.videoPleer.hover({ force: true });
    await this.fullScreenButton.click();
  }

  async waitVideoPleerGone() {
    await this.videoControlPanel.waitFor({ state: 'detached' });
  }

  async openFullScreen() {
    return await this.page.keyboard.press('Control+F');
  }
}
