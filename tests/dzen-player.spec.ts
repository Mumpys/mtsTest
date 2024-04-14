import { test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { VideoPage } from '../pages/videoPage';
import { OneVideoPage } from '../pages/oneVideoPage';

test.describe('Dzen tests', () => {
  test('Open video and check player', async ({ page }) => {
    const mainPage: MainPage = new MainPage(page, 'https://dzen.ru/');
    await mainPage.open();
    await mainPage.scrollOnVideoSection();
    await mainPage.checkVideoCardsTitle();
    await mainPage.checkVideoCardsAvatar();
    await mainPage.checkVideoCardsDescription();
    await mainPage.subscribeButtonsCheck();
    await mainPage.clickSidebarButton('Видео');

    const videoPage: VideoPage = new VideoPage(page, 'https://dzen.ru/video');

    await videoPage.checkChangeVideoButton();
    await videoPage.searchVideoByText('Синий трактор');
    await videoPage.choosePreset('Видео и ролики');

    const currentVideoPage = await videoPage.newTabHandler(
      videoPage.clickFirstVideo()
    );

    const singleVideoPage = new OneVideoPage(currentVideoPage, '');
    await singleVideoPage.checkVideoPlayerElements();
    await singleVideoPage.waitVideoPlayerGone();
    await singleVideoPage.openFullScreen();
  });
});
