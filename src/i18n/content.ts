// Тексты сайта на двух языках. Факты — по состоянию продукта (возможности, форматы,
// лимиты по умолчанию); при изменении продукта обновлять здесь.

export type Lang = 'ru' | 'en';

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

export const content: Record<Lang, Content> = {
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
        'PDC находит в документах ФИО, телефоны, e-mail, номера банковских карт, СНИЛС, ИНН, IBAN и заменяет их правдоподобными вымышленными значениями или метками. Оформление документа сохраняется, а сами документы не покидают сеть организации.',
      benefits: ['Работает без интернета', 'Без утечек данных', 'Полный контроль над анонимизацией данных внутри контура компании', 'Удобный инструмент для аналитики данных и создания набора тестовых данных для разработчиков'],
      primary: 'Возможности',
      secondary: 'Контакты',
    },
    how: {
      title: 'Как это работает',
      steps: [
        { title: 'Сервер в вашей сети', text: 'Администратор разворачивает PDC.Сервер (Docker Compose) на сервере организации. Модели распознавания работают локально.' },
        { title: 'Клиент у сотрудников', text: 'PDC.Desktop устанавливается без прав администратора; адрес сервера указывается при установке.' },
        { title: 'Документ — в окно', text: 'Файл перетаскивают в окно программы и получают обезличенную копию в том же формате.' },
      ],
    },
    desktop: {
      title: 'PDC.Desktop',
      lead: 'Приложение для Windows, через которое сотрудники работают с сервером.',
      items: [
        { title: 'Один документ', text: 'Перетащите файл или выберите его — результат сохраняется рядом с исходным именем (имя_anonymized).' },
        { title: 'Пакетная обработка', text: 'Несколько файлов или папка за раз (по умолчанию до 20 файлов, 100 МБ); обработка идёт в фоне, результаты скачиваются по готовности.' },
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
        { title: 'Правдоподобная замена', text: 'ФИО заменяется ФИО того же рода и в том же падеже, телефон — номером в том же формате и с тем же кодом страны. Или меткой вида [EMAIL] — режим настраивается.' },
        { title: 'Сканы и изображения', text: 'Распознавание текста (OCR) на изображениях, многостраничных TIFF и сканированных PDF; замена рисуется на месте исходного текста.' },
        { title: 'Оформление сохраняется', text: 'Замена встаёт на место исходного значения — шрифты и вёрстка не меняются; по желанию — метки той же длины, что и исходный текст.' },
        { title: 'Пользователи и журнал', text: 'Вход по логину и паролю, роли «Пользователь» и «Администратор», журнал причин замены по каждому документу.' },
        { title: 'REST API', text: 'Все возможности доступны через API с документацией Swagger — для интеграции с другими системами.' },
      ],
    },
    pii: {
      title: 'Что находится и заменяется',
      lead: 'Структурированные данные распознаются независимо от языка документа, ФИО — в русских и английских текстах.',
      rows: [
        ['Телефоны', 'Россия, США и международный формат (+44, +49 …)'],
        ['E-mail', 'Адреса электронной почты'],
        ['Банковские карты', 'С проверкой контрольной суммы (алгоритм Луна)'],
        ['СНИЛС, ИНН', 'С проверкой контрольных чисел'],
        ['IBAN', 'С пробелами и без, с проверкой контрольной суммы'],
        ['ФИО', 'Русские и английские имена, в любом падеже'],
        ['Паспорт РФ, SSN США', 'Включаются в настройках сервера'],
      ],
      note: 'Значение, похожее по формату, но не прошедшее проверку контрольной суммы, заменяется отдельной меткой — например, [FAKEBANKCARD].',
    },
    formats: {
      title: 'Форматы документов',
      rows: [
        ['Word', '.doc, .docx'],
        ['Excel', '.xls, .xlsx'],
        ['PowerPoint', '.ppt, .pptx'],
        ['PDF', 'текстовые и сканированные'],
        ['Текст', '.txt, .csv'],
        ['Изображения', '.png, .jpg, .jpeg, .bmp, .tif, .tiff'],
      ],
    },
    example: {
      title: 'Пример: скан служебной записки',
      lead: 'Документ с вымышленными данными до и после обработки. В этом примере для ФИО и телефонных номеров сгенерированы новые случайные значения, а адрес электронной почты заменён меткой [EMAIL]. Способ замены каждого типа данных можно выбрать в настройках.',
      before: 'До',
      after: 'После',
      caption: 'ФИО, телефоны, e-mail и номер карты заменены; расположение текста и таблица сохранены.',
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
          'Linux или Windows с Docker и Docker Compose',
          'Память — от 16 ГБ, диск — около 25 ГБ',
          'Для работы сервера доступ в интернет не требуется: обработка данных выполняется внутри сети организации',
        ],
      },
      client: {
        title: 'PDC.Desktop',
        items: ['Windows 10 или 11, 64-разрядная', 'Сетевой доступ к серверу'],
      },
      deploy: {
        title: 'Развёртывание',
        items: [
          'Сервер запускается одной командой docker compose up: PDC.Сервер, база данных PostgreSQL и контейнеры моделей',
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
          a: 'Только на PDC.Сервер вашей организации. Исходный файл не сохраняется; результаты пакетной обработки хранятся ограниченное время (по умолчанию 24 часа) и удаляются. Сохранение обработанных документов на сервере выключено по умолчанию.',
        },
        { q: 'Нужен ли интернет?', a: 'Для работы PDC.Сервер и PDC.Desktop подключение к интернету не требуется. Обработка документов выполняется на сервере организации, а настольное приложение связывается с ним по внутренней сети.' },
        {
          q: 'Насколько надёжно находятся ФИО?',
          a: 'Имена распознают модели машинного обучения — они работают хорошо, но не дают стопроцентной гарантии. Для ответственных документов проверяйте результат и журнал причин замены.',
        },
        { q: 'Сохранится ли оформление?', a: 'Да: замена встаёт на место исходного текста, шрифты и вёрстка не меняются. На сканах замена рисуется на месте исходного текста.' },
        { q: 'Какие языки документов поддерживаются?', a: 'ФИО — в русских и английских текстах; телефоны, e-mail, номера карт и другие структурированные данные — независимо от языка.' },
        { q: 'Можно ли подключить PDC к своим системам?', a: 'Да, через REST API сервера — он описан в документации Swagger.' },
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
        'PDC finds names, phone numbers, emails, bank card numbers, IBANs, Russian SNILS/INN and other personal data in documents and replaces them with plausible fake values or labels. Document layout is preserved, and documents never leave your organization’s network.',
      benefits: ['Works without internet access', 'No data leaks', 'Full control over data anonymization within your company’s network', 'A convenient tool for data analytics and creating test datasets for developers'],
      primary: 'Features',
      secondary: 'Contact',
    },
    how: {
      title: 'How it works',
      steps: [
        { title: 'A server in your network', text: 'An administrator deploys PDC.Server (Docker Compose) on an organization server. Recognition models run locally.' },
        { title: 'A client for employees', text: 'PDC.Desktop installs without administrator rights; the server address is set during installation.' },
        { title: 'Drop a document', text: 'Drag a file into the app window and get an anonymized copy in the same format.' },
      ],
    },
    desktop: {
      title: 'PDC.Desktop',
      lead: 'A Windows application employees use to work with the server.',
      items: [
        { title: 'Single document', text: 'Drop a file or pick it — the result is saved next to the original name (name_anonymized).' },
        { title: 'Batch processing', text: 'Several files or a whole folder at once (20 files / 100 MB by default); processing runs in the background, results are downloaded when ready.' },
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
        { title: 'Plausible replacement', text: 'A name is replaced with a name of the same gender and grammatical case, a phone number with one in the same format and country code. Or with a label like [EMAIL] — the mode is configurable.' },
        { title: 'Scans and images', text: 'Text recognition (OCR) in images, multi-page TIFFs and scanned PDFs; replacements are drawn where the original text was.' },
        { title: 'Layout is preserved', text: 'Replacements take the place of the original value — fonts and layout stay the same; optionally, labels of the same length as the original text.' },
        { title: 'Users and log', text: 'Sign-in with login and password, User and Administrator roles, a log of replacement reasons for every document.' },
        { title: 'REST API', text: 'Everything is available via an API documented in Swagger — for integration with other systems.' },
      ],
    },
    pii: {
      title: 'What is detected and replaced',
      lead: 'Structured data is detected regardless of the document language, names — in Russian and English texts.',
      rows: [
        ['Phone numbers', 'Russia, USA and international format (+44, +49 …)'],
        ['Email', 'Email addresses'],
        ['Bank cards', 'With checksum validation (Luhn algorithm)'],
        ['SNILS, INN (Russia)', 'With check digit validation'],
        ['IBAN', 'With or without spaces, with checksum validation'],
        ['Full names', 'Russian and English names, in any grammatical case'],
        ['Russian passport, US SSN', 'Enabled in the server settings'],
      ],
      note: 'A value that looks right but fails checksum validation is replaced with a separate label — for example, [FAKEBANKCARD].',
    },
    formats: {
      title: 'Document formats',
      rows: [
        ['Word', '.doc, .docx'],
        ['Excel', '.xls, .xlsx'],
        ['PowerPoint', '.ppt, .pptx'],
        ['PDF', 'text and scanned'],
        ['Text', '.txt, .csv'],
        ['Images', '.png, .jpg, .jpeg, .bmp, .tif, .tiff'],
      ],
    },
    example: {
      title: 'Example: a scanned memo',
      lead: 'A document with fictitious data before and after processing. In this example, names and phone numbers are replaced with newly generated random values, while the email address becomes an [EMAIL] label. The replacement method for each data type can be changed in the settings.',
      before: 'Before',
      after: 'After',
      caption: 'Names, phone numbers, emails and the card number are replaced; text placement and the table are preserved.',
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
        items: ['Linux or Windows with Docker and Docker Compose', 'Memory — 16 GB or more, disk — about 25 GB', 'The server works without internet access: data is processed within your organization’s network'],
      },
      client: {
        title: 'PDC.Desktop',
        items: ['Windows 10 or 11, 64-bit', 'Network access to the server'],
      },
      deploy: {
        title: 'Deployment',
        items: [
          'The server starts with a single docker compose up: PDC.Server, a PostgreSQL database and model containers',
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
          a: 'Only to your organization’s PDC.Server. The original file is not stored; batch results are kept for a limited time (24 hours by default) and then deleted. Storing processed documents on the server is off by default.',
        },
        { q: 'Is internet access required?', a: 'Neither PDC.Server nor PDC.Desktop requires internet access to operate. Documents are processed on your organization’s server, and the desktop application connects to it over your internal network.' },
        {
          q: 'How reliably are names detected?',
          a: 'Names are detected by machine learning models — they work well but cannot give a 100% guarantee. For sensitive documents, review the result and the replacement reasons log.',
        },
        { q: 'Is the layout preserved?', a: 'Yes: replacements take the place of the original text, fonts and layout do not change. In scans, replacements are drawn where the original text was.' },
        { q: 'Which document languages are supported?', a: 'Names — in Russian and English texts; phone numbers, emails, card numbers and other structured data — regardless of the language.' },
        { q: 'Can PDC be connected to our systems?', a: 'Yes, via the server REST API documented in Swagger.' },
      ],
    },
    contact: {
      title: 'Contact',
      text: 'For questions about PDC, suggestions and delivery enquiries:',

    },
    footer: 'Screenshots and examples use fictitious data.',
  },
};
