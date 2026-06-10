# Описание эндпоинтов

## GET:

### /api/sidebar

> Возвращает иерархическую структуру навигационного меню. Поддерживает рекурсивную вложенность элементов (папок и страниц) согласно конфигурационному файлу.
>
>⚠️ Техническое ограничение: глубина вложенности ограничена лимитом рекурсии JS (обычно ~10 000-15 000 уровней) и настройками приложения. Рекомендуемая максимальная глубина — не более 10-20 уровней.

#### Выходные параметры

| Поле | Тип | Обязательность | Ограничения | Пример |
|------|-----|----------------|-------------|--------|
| **sidebar** | `array[object]` | ✅ Required | Массив объектов `SidebarContent` | `sidebar: [...]` |
| **sidebar[].id** | `string` | ✅ Required | Уникальный идентификатор | `id: "page_1"` |
| **sidebar[].type** | `string` | ✅ Required | `SidebarType` | `type: "page"` |
| **sidebar[].icon** | `string` | ❌ Optional | Имя иконки из https://lucide.dev/icons | `icon: "house"` |


#### SidebarContent для SidebarType = "page"

| Поле | Тип | Обязательность | Пример |
|------|-----|----------------|--------|
| **content** | `array[array[object]]` | ✅ Required | `content: [[{...}]]` |
| **content[][].id** | `string` | ✅ Required | `id: "chart_1"` |
| **content[][].type** | `ContentType` | ✅ Required | `type: "chart"` |

####  SidebarContent для SidebarType = "folder"

| Поле | Тип | Обязательность | Пример |
|------|-----|----------------|--------|
| **children** | `array[SidebarContent]` | ✅ Required | `children: [...]` |

#### Enum значения

| Поле | Допустимые значения |
|------|--------------------|
| SidebarType | `"page"`, `"folder"` |
| ContentType | `"chart"`, `"table"`, `"gantt"`, `"form"` |


