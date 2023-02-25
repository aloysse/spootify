<h1 align="center">
  Spootify
</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/aloysse/spootify/2f89bc0653065c2a1266a2d9ed46dd3e72e7dcf8/spootify-cover.jpg">
</p>

## Spotify Clone with React

*[React](https://reactjs.org) + [Vite](https://vitejs.dev)*

本專案使用 [**Spotify** for Developers](https://developer.spotify.com/) 所提供之 web api，以 React 重建web 播放器。

> 目前僅使用 api 所提供之 preview 音訊，如要在專案中播放完整音樂請參考官方提供的 [web playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/) 文件，或使用相關套件。

## Set Up Account

使用此專案前需先至[**Spotify** for Developers](https://developer.spotify.com/dashboard/)註冊開發者服務（可登入原 Spotify 帳號），建立自己的 App 專案。取得 **Client ID**，並設定 App 要導向的 **URIs**

> 詳細流程可參考[文件](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/) 


### change account settings

開起專案中的 `spotify.js` 將以下變數改為您的資料。

```js title= /utils/spotify.js
const redirectUri = {your redirect uri};
const clientId = {your client id};
```

## Scripts

指令說明如下

| Script        | Description                                  |
| ------------- | -------------------------------------------- |
| npm run dev   | 啟動開發者模式                               |
| npm run build | 打包檔案至 `dist` 資料夾中                   |
| npm run serve | 在本定啟動 server 運行 `dist` 資料夾中的檔案 |