# PDC — сайт-визитка

Сайт с информацией о **Personal Data Cleaner (PDC)** для пользователей: возможности
PDC.Desktop и PDC.Server, пример обработки, требования, частые вопросы.
Публикуется на GitHub Pages: **https://a0nikolaev.github.io/pdc/** (`/ru/`, `/en/`; корень
выбирает язык по браузеру).

Контакт по вопросам о PDC: a0nikolaevsoft@gmail.com.

## Устройство

- [Astro](https://astro.build) 5, статическая сборка; тексты обоих языков —
  `src/i18n/content.ts`, разметка — `src/components/Landing.astro`, стили —
  `src/styles/global.css` (тёмная тема по умолчанию и светлая тема; переключатель рядом с языком, выбор сохраняется в браузере).
- Изображения — `public/img/`: карусель содержит пять экранов PDC.Desktop на каждом языке.
  Снимки интерфейса подготовлены из сборки приложения с изолированным демонстрационным
  HTTP-транспортом и отдельными настройками, без подключения к реальному серверу.
  Пример «до/после» сделан на
  тестовых документах с **вымышленными** данными. Реальные документы и персональные данные
  на сайт не попадают.
- Публикация — `.github/workflows/deploy.yml` (официальный `withastro/action`) при каждом
  push в `main`.

- Анимированный фон показывает превращение условных персональных данных в метки;
  есть пауза и поддержка системной настройки уменьшения движения.

## Локально

```bash
npm install
npm run dev      # http://localhost:4321/pdc/
npm run build    # результат — dist/
```

Без установленного Node.js — в контейнере:

```bash
docker run --rm -it -p 4321:4321 -v "$PWD:/site" -w /site node:22 bash -c "npm install && npm run dev"
```

## История изменений

Страницы `/pdc/ru/changelog/` и `/pdc/en/changelog/` доступны по ссылке
«Обновления» / «Updates» в шапке. Карточки содержат основные изменения по патчам,
а фильтры позволяют отдельно смотреть desktop и сервер. Без JavaScript видны
все релизы. При смене языка сохраняется раздел; тема общая с главной страницей.

Данные `src/data/releases.json` включены в репозиторий: сборка сайта не требует
доступа к исходникам продукта. Для обновления после релиза:

```bash
npm run sync:releases
# Если продукт находится не в соседнем personal-data-cleaner:
npm run sync:releases -- C:/repos/personal-data-cleaner
npm run build
```

Скрипт берёт согласованные основные изменения RU/EN из ресурсов desktop
(`Changelog.DesktopHistory`, `Changelog.ServerHistory`) и проверяет наличие
каждой версии в соответствующем `change_log/CHANGELOG*.md` основного проекта.
После синхронизации закоммитить обновлённый JSON. Запланированные задачи
в историю выпущенных версий не попадают.

## Первая публикация

1. Создать **публичный** репозиторий `a0nikolaev/pdc` на GitHub (без README).
2. `git remote add origin https://github.com/a0nikolaev/pdc.git && git push -u origin main`
3. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. После первого запуска workflow сайт доступен по адресу выше.
