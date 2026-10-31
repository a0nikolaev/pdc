// Базовые тексты RU/EN и переводы четырёх дополнительных языков. Факты — по состоянию продукта (возможности, форматы,
// лимиты по умолчанию); при изменении продукта обновлять здесь.

import web from './web.json';
import kk from './locales/kk.json';
import uz from './locales/uz.json';
import ky from './locales/ky.json';
import tg from './locales/tg.json';
export type { Language as Lang } from './languages';
import type { Language as Lang } from './languages';

export interface Feature {
  title: string;
  text: string;
}

export interface Content {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { features: string; how: string; example: string; requirements: string; faq: string; contact: string };
  langSwitch: { label: string; target: Lang };
  hero: { title: string; tagline: string; lead: string; benefits: string[]; primary: string; secondary: string };
  how: { title: string; steps: Feature[] };
  desktop: { title: string; lead: string; items: Feature[] };
  server: { title: string; lead: string; items: Feature[] };
  pii: { title: string; lead: string; rows: [string, string][]; note: string };
  formats: { title: string; rows: [string, string][] };
  example: { title: string; lead: string; before: string; after: string; caption: string };
  screenshot: { title: string; alt: string; caption: string };
  requirements: { title: string; server: { title: string; items: string[] }; client: { title: string; items: string[] }; deploy: { title: string; items: string[] } };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: { title: string; text: string };
  footer: string;
}

export const contactEmail = 'a0nikolaevsoft@gmail.com';

const originalContent: Record<'ru' | 'en', Content> = {
  ru: {
    htmlLang: 'ru',
    meta: {
      title: 'Personal Data Cleaner (PDC) — обезличивание персональных данных в документах',
      description:
        'PDC находит в документах ФИО, телефоны, e-mail, номера карт, СНИЛС, ИНН, IBAN и заменяет их. Обработка — на сервере вашей организации.',
    },
    nav: { features: 'Возможности', how: 'Как это работает', example: 'Пример', requirements: 'Требования', faq: 'Вопросы', contact: 'Контакты' },
    langSwitch: { label: 'English', target: 'en' },
    hero: {
      title: 'Personal Data Cleaner',
      tagline: 'Обезличивание персональных данных в документах — на ваших серверах',
      lead:
        'PDC ищет в документах ФИО, телефоны, e-mail, номера карт, СНИЛС, ИНН и IBAN и заменяет найденные значения вымышленными данными, шаблонами или масками. Обработка выполняется на серверах вашей организации. Оформление документа сохраняется, а сами документы не покидают сеть организации.',
      benefits: ['Работает без интернета', 'Без утечек данных', 'Полный контроль над анонимизацией данных внутри контура компании', 'Удобный инструмент для аналитики данных и создания набора тестовых данных для разработчиков'],
      primary: 'Возможности',
      secondary: 'Контакты',
    },
    how: {
      title: 'Как это работает',
      steps: [
        { title: 'Сервер в вашей сети', text: 'Администратор разворачивает PDC.Сервер (Docker Compose) на сервере организации. Модели распознавания работают локально.' },
        { title: 'Клиент у сотрудников', text: 'PDC.Desktop устанавливается без прав администратора; адрес сервера указывается при установке.' },
        { title: 'Документ — в окно', text: 'Перетащите поддерживаемый файл в окно программы. При успешной обработке получите копию в том же формате; при ошибке или отказе результат не выдаётся.' },
      ],
    },
    desktop: {
      title: 'PDC.Desktop',
      lead: 'Приложение для Windows, через которое сотрудники работают с сервером.',
      items: [
        { title: 'Один документ', text: 'Выберите файл или перетащите его в окно. По умолчанию результат сохраняется рядом с исходником с суффиксом _anonymized; папка и шаблон имени настраиваются.' },
        { title: 'Пакетная обработка', text: 'Несколько файлов или папка: по умолчанию до 20 файлов, 100 МБ на пакет и 25 МБ на файл. Обработка идёт в фоне, готовые результаты скачиваются; лимиты задаёт сервер.' },
        { title: 'Причины замены', text: 'Для каждого документа видно, что, где и почему заменено; экспорт в CSV и JSON.' },
        { title: 'Администрирование', text: 'Пользователи и роли, метки и режимы замены для каждого типа документа — для роли «Администратор».' },
        { title: 'Несколько серверов', text: 'Профили серверов с быстрым переключением.' },
        { title: 'Русский и английский', text: 'Язык интерфейса переключается в настройках.' },
        { title: 'Простая установка', text: 'Установка для текущего пользователя без прав администратора; поддерживается тихое развёртывание на рабочих местах.' },
      ],
    },
    server: {
      title: 'PDC.Сервер',
      lead: 'Серверная часть: находит и заменяет персональные данные, хранит настройки и журнал решений.',
      items: [
        { title: 'Правила и модели', text: 'Структурированные данные — по правилам с проверкой контрольных сумм; ФИО — нейросетевыми моделями.' },
        { title: 'Правдоподобная замена', text: 'Generate создаёт вымышленные значения, Template подставляет метки, Mask частично скрывает данные. Режимы можно сочетать по типам ПДн. Для русских ФИО учитываются род и падеж, если морфологический разбор успешен; маскирование оставляет часть значения видимой.' },
        { title: 'Сканы и изображения', text: 'Распознавание текста (OCR) на изображениях, многостраничных TIFF и сканированных PDF; замена рисуется на месте исходного текста.' },
        { title: 'Работа с оформлением', text: 'Обработчики стремятся сохранить структуру документа. В PDF, OCR и при конвертации старых Office возможны изменения вёрстки и шрифтов. Для шаблонов доступна подгонка длины; результат следует проверить.' },
        { title: 'Пользователи и журнал', text: 'Вход по логину и паролю, роли «Пользователь» и «Администратор», журнал причин замены по каждому документу.' },
        { title: 'REST API', text: 'Все возможности доступны через API с документацией Swagger — для интеграции с другими системами.' },
      ],
    },
    pii: {
      title: 'Что находится и заменяется',
      lead: 'Телефоны, e-mail и другие структурированные данные ищутся по правилам формата, контрольным суммам и контексту. Модели ФИО работают с русским и английским текстом. Поддержка типа не гарантирует нахождение каждого значения.',
      rows: [
        ['Телефоны', 'Россия, США и международный формат (+44, +49 …)'],
        ['E-mail', 'Адреса электронной почты'],
        ['Банковские карты', 'С проверкой контрольной суммы (алгоритм Луна)'],
        ['СНИЛС, ИНН', 'С проверкой контрольных чисел'],
        ['IBAN', 'С пробелами и без, с проверкой контрольной суммы'],
        ['ФИО', 'Модельное распознавание русских и английских имён; возможны пропуски и ложные срабатывания'],
        ['Паспорт РФ, SSN США', 'Включаются в настройках сервера'],
      ],
      note: 'Кандидаты карт, СНИЛС, ИНН и IBAN с неверной контрольной суммой могут заменяться отдельной меткой, например [FAKEBANKCARD]. Для Office, числовых форматов Excel, формул и встроенных изображений есть ограничения покрытия; некоторые документы явно отклоняются.',
    },
    formats: {
      title: 'Форматы документов',
      rows: [
        ['Word', '.doc, .docx'],
        ['Excel', '.xls, .xlsx'],
        ['PowerPoint', '.ppt, .pptx'],
        ['PDF', 'Текстовые, сканированные и смешанные; ограничения зависят от документа'],
        ['Текст', '.txt, .csv'],
        ['Изображения', '.png, .jpg, .jpeg, .bmp, .tif, .tiff'],
      ],
    },
    example: {
      title: 'Пример: скан служебной записки',
      lead: 'Иллюстративный пример с вымышленными данными до и после обработки, не проверка текущей версии. Здесь для ФИО и телефонов сгенерированы значения, email заменён на [EMAIL]. Режим каждого типа данных выбирается в настройках.',
      before: 'До',
      after: 'После',
      caption: 'На этом примере заменены ФИО, телефоны, e-mail и номер карты; показано расположение текста и таблицы. Пример не доказывает качество на других документах.',
    },
    screenshot: {
      title: 'PDC.Desktop',
      alt: 'Главное окно PDC.Desktop: вкладка обезличивания документа',
      caption: 'Главное окно: перетащите файл — получите обезличенную копию.',
    },
    requirements: {
      title: 'Требования и развёртывание',
      server: {
        title: 'PDC.Сервер',
        items: [
          'Linux x86-64 с Docker Engine и Compose v2; на Windows — Docker Desktop в режиме Linux containers',
          'CPU, RAM и свободный диск подбираются под модели, документы и параллелизм. Универсальный физический минимум для текущей версии не подтверждён; нужен пилот на вашем корпусе.',
          'Локальная обработка требует заранее подготовленных образов, весов моделей и зависимостей; автономный запуск проверяется для выбранного комплекта',
        ],
      },
      client: {
        title: 'PDC.Desktop',
        items: ['Windows 10 или 11, 64-разрядная', 'Сетевой доступ к серверу'],
      },
      deploy: {
        title: 'Развёртывание',
        items: [
          'Перед docker compose up подготовьте образы и модели, секреты, параметры БД и подписки. Стек включает API, PostgreSQL, миграции и сервисы обработки.',
          'Клиенты ставятся установщиком, в том числе тихо — с адресом сервера в параметрах',
          'Инструкция для администратора предоставляется вместе с поставкой',
        ],
      },
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        {
          q: 'Куда попадают документы?',
          a: 'Файлы поступают в PDC.Сервер организации. Пакетный вход находится в памяти; OCR и конвертер могут создавать временные файлы. Результаты пакетов хранятся по умолчанию 24 часа и удаляются очисткой. Постоянный кэш результатов по умолчанию выключен; журнал причин может содержать исходные значения.',
        },
        { q: 'Нужен ли интернет?', a: 'Распознавание и обработка выполняются локально. Автономный запуск требует заранее подготовленных образов, весов моделей и зависимостей. Первичная установка и обновления могут требовать доступа к источнику поставки; готовность изолированного комплекта проверяется отдельно.' },
        {
          q: 'Насколько надёжно находятся ФИО?',
          a: 'Модели машинного обучения могут пропускать имена и находить лишние совпадения. Проверка выходного файла не гарантирует нахождения неизвестных ПДн. Для ответственных документов проверяйте результат, предупреждения покрытия и журнал причин замены.',
        },
        { q: 'Сохранится ли оформление?', a: 'Сохранение структуры — цель обработчиков, но одинаковые шрифты и вёрстка не гарантируются для всех файлов, особенно PDF, сканов и старых Office после конвертации. Проверьте результат перед использованием.' },
        { q: 'Какие языки документов поддерживаются?', a: 'Модели имён работают с русским и английским текстом; структурированные данные — с поддерживаемыми форматами и контекстами. Шесть языков сайта не означают шесть языков распознавания. Для нового языка нужна отдельная модель и адаптация правил.' },
        { q: 'Можно ли подключить PDC к своим системам?', a: 'Да, через REST API сервера с документацией Swagger. Доступ регулируется авторизацией, ролями, действующей подпиской и настройками сервера.' },
      ],
    },
    contact: {
      title: 'Контакты',
      text: 'По вопросам о PDC, предложениям и запросам на поставку:',

    },
    footer: 'Скриншоты и примеры подготовлены на вымышленных данных.',
  },

  en: {
    htmlLang: 'en',
    meta: {
      title: 'Personal Data Cleaner (PDC) — personal data anonymization for documents',
      description:
        'PDC finds names, phone numbers, emails, card numbers, IBANs and other personal data in documents and replaces them. Processing runs on your own servers.',
    },
    nav: { features: 'Features', how: 'How it works', example: 'Example', requirements: 'Requirements', faq: 'FAQ', contact: 'Contact' },
    langSwitch: { label: 'Русский', target: 'ru' },
    hero: {
      title: 'Personal Data Cleaner',
      tagline: 'Personal data anonymization for documents — on your own servers',
      lead:
        'PDC looks for names, phones, emails, card numbers, Russian SNILS/INN and IBANs, and replaces detected values with fictitious data, templates or masks. Processing runs on your organization’s servers. Review the output and layout.',
      benefits: ['Works without internet access', 'No data leaks', 'Full control over data anonymization within your company’s network', 'A convenient tool for data analytics and creating test datasets for developers'],
      primary: 'Features',
      secondary: 'Contact',
    },
    how: {
      title: 'How it works',
      steps: [
        { title: 'A server in your network', text: 'An administrator deploys PDC.Server (Docker Compose) on an organization server. Recognition models run locally.' },
        { title: 'A client for employees', text: 'PDC.Desktop installs without administrator rights; the server address is set during installation.' },
        { title: 'Drop a document', text: 'Drop a supported file into the app. Successful processing returns a copy in the same format; errors or explicit refusals do not produce a result.' },
      ],
    },
    desktop: {
      title: 'PDC.Desktop',
      lead: 'A Windows application employees use to work with the server.',
      items: [
        { title: 'Single document', text: 'Pick or drop a file. By default, the result is saved beside the source with an _anonymized suffix; the output folder and filename template are configurable.' },
        { title: 'Batch processing', text: 'Several files or a folder: defaults are 20 files, 100 MB per batch and 25 MB per file. Processing runs in the background; ready results are downloaded. Limits are set by the server.' },
        { title: 'Replacement reasons', text: 'For every document you can see what was replaced, where and why; export to CSV and JSON.' },
        { title: 'Administration', text: 'Users and roles, labels and replacement modes per document type — for the Administrator role.' },
        { title: 'Multiple servers', text: 'Server profiles with quick switching.' },
        { title: 'English and Russian', text: 'The interface language is switched in the settings.' },
        { title: 'Easy installation', text: 'Per-user installation without administrator rights, with silent deployment across workstations.' },
      ],
    },
    server: {
      title: 'PDC.Server',
      lead: 'The server side: finds and replaces personal data, stores settings and the decision log.',
      items: [
        { title: 'Rules and models', text: 'Structured data — rules with checksum validation; names — neural models.' },
        { title: 'Plausible replacement', text: 'Generate creates fictitious values, Template inserts labels, and Mask partially hides data. Modes can be combined by PII type. Russian name gender and case are considered when morphological analysis succeeds; masking leaves part of the value visible.' },
        { title: 'Scans and images', text: 'Text recognition (OCR) in images, multi-page TIFFs and scanned PDFs; replacements are drawn where the original text was.' },
        { title: 'Document layout', text: 'Handlers aim to preserve document structure. PDF, OCR and legacy Office conversion may change layout or fonts. Templates can be fitted to the original length; review the result.' },
        { title: 'Users and log', text: 'Sign-in with login and password, User and Administrator roles, a log of replacement reasons for every document.' },
        { title: 'REST API', text: 'Everything is available via an API documented in Swagger — for integration with other systems.' },
      ],
    },
    pii: {
      title: 'What is detected and replaced',
      lead: 'Phones, emails and other structured data use format rules, checksums and context. Name models process Russian and English text. Supporting a type does not guarantee finding every value.',
      rows: [
        ['Phone numbers', 'Russia, USA and international format (+44, +49 …)'],
        ['Email', 'Email addresses'],
        ['Bank cards', 'With checksum validation (Luhn algorithm)'],
        ['SNILS, INN (Russia)', 'With check digit validation'],
        ['IBAN', 'With or without spaces, with checksum validation'],
        ['Full names', 'Model-based Russian and English name recognition; misses and false positives are possible'],
        ['Russian passport, US SSN', 'Enabled in the server settings'],
      ],
      note: 'Card, SNILS, INN and IBAN candidates with invalid checksums may receive a separate label such as [FAKEBANKCARD]. Office, Excel numeric formats, formulas and embedded images have coverage limitations; some documents are explicitly rejected.',
    },
    formats: {
      title: 'Document formats',
      rows: [
        ['Word', '.doc, .docx'],
        ['Excel', '.xls, .xlsx'],
        ['PowerPoint', '.ppt, .pptx'],
        ['PDF', 'Text, scanned and mixed; limitations depend on the document'],
        ['Text', '.txt, .csv'],
        ['Images', '.png, .jpg, .jpeg, .bmp, .tif, .tiff'],
      ],
    },
    example: {
      title: 'Example: a scanned memo',
      lead: 'An illustrative before/after example using fictitious data, not a test of the current version. Here names and phone numbers use generated values, while email becomes [EMAIL]. The mode is configured per data type.',
      before: 'Before',
      after: 'After',
      caption: 'This example replaces names, phones, emails and a card number and illustrates text/table placement. It does not establish quality for other documents.',
    },
    screenshot: {
      title: 'PDC.Desktop',
      alt: 'PDC.Desktop main window: document anonymization tab',
      caption: 'The main window: drop a file — get an anonymized copy.',
    },
    requirements: {
      title: 'Requirements and deployment',
      server: {
        title: 'PDC.Server',
        items: ['Linux x86-64 with Docker Engine and Compose v2; on Windows, Docker Desktop in Linux containers mode', 'CPU, RAM and free disk depend on models, documents and concurrency. A universal physical minimum for the current version has not been established; pilot with your own corpus.', 'Local processing requires prepared images, model weights and dependencies; offline readiness is checked for the selected delivery bundle'],
      },
      client: {
        title: 'PDC.Desktop',
        items: ['Windows 10 or 11, 64-bit', 'Network access to the server'],
      },
      deploy: {
        title: 'Deployment',
        items: [
          'Before docker compose up, prepare images, models, secrets, database and subscription settings. The stack includes the API, PostgreSQL, migrations and processing services.',
          'Clients are installed with the installer, including silently with the server address as a parameter',
          'An administrator guide is provided with the delivery',
        ],
      },
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          q: 'Where do documents go?',
          a: 'Files go to your organization’s PDC.Server. Batch input is held in memory; OCR and conversion may create temporary files. Batch results are retained for 24 hours by default and removed by cleanup. Persistent output caching is off by default; the reasons log may contain original values.',
        },
        { q: 'Is internet access required?', a: 'Recognition and processing run locally. Offline startup requires prepared images, model weights and dependencies. Initial installation and updates may require access to a delivery source; isolated-bundle readiness is verified separately.' },
        {
          q: 'How reliably are names detected?',
          a: 'Machine learning models can miss names or produce false positives. Output verification cannot guarantee detection of unknown PII. For sensitive documents, review the result, coverage warnings and replacement reasons log.',
        },
        { q: 'Is the layout preserved?', a: 'Handlers aim to preserve structure, but identical fonts and layout are not guaranteed for every file, especially PDF, scans and legacy Office conversions. Review the output before use.' },
        { q: 'Which document languages are supported?', a: 'Name models process Russian and English; structured data uses supported formats and contexts. Six website languages do not mean six recognition languages. Another language requires a dedicated model and adapted rules.' },
        { q: 'Can PDC be connected to our systems?', a: 'Yes, through the server REST API documented in Swagger. Access is governed by authentication, roles, an active subscription and server settings.' },
      ],
    },
    contact: {
      title: 'Contact',
      text: 'For questions about PDC, suggestions and delivery enquiries:',

    },
    footer: 'Screenshots and examples use fictitious data.',
  },
};

export const content: Record<Lang, Content> = {...originalContent, kk: kk as Content, uz: uz as Content, ky: ky as Content, tg: tg as Content};

for (const lang of ['ru','en','kk','uz','ky','tg'] as const) content[lang].how.steps[1].text = web[lang].how;
