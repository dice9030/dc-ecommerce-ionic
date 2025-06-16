## Estructura del Proyecto

```plaintext
.
├── .browserslistrc
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── karma.conf.js
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── src/
│   ├── global.scss
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── test.ts
│   ├── zone-flags.ts
│   ├── app/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── home/
│   │   │   ├── home.module.ts
│   │   │   ├── home.page.html
│   │   │   ├── home.page.scss
│   │   │   ├── home.page.spec.ts
│   │   │   ├── home.page.ts
│   │   ├── login/
│   │   ├── orders/
│   │   ├── services/
│   │   │   └── sqlite.service.ts
│   ├── assets/
│   ├── environments/
│   ├── theme/
├── .angular/
│   └── cache/
│       └── 16.2.7/
```

## Cómo levantar el proyecto

1. **Clona el repositorio:**
   ```sh
   git clone <URL-del-repositorio>
   cd dc-ecommerce-ionic
   ```
2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Levanta la aplicación en modo desarrollo:**
   ```sh
   ionic serve
   ```

4. **(Opcional) Compila y ejecuta en un dispositivo o emulador:**
   ```sh
   ionic capacitor run android
   # o para iOS
   ionic capacitor run ios
   ```

> Asegúrate de tener instalado [Node.js](https://nodejs.org/),