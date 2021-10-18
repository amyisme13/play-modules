# Play Modules

Me playing around with modulated laravel.

## What this starter have?

- [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) & [Fortify](https://laravel.com/docs/8.x/fortify) - authentication
- [Laravel Sail](https://laravel.com/docs/8.x/sail) - dockerize laravel
- [Laravel Permission](https://spatie.be/docs/laravel-permission/v5/introduction) - permissions & roles
- [Laravel Modules](https://nwidart.com/laravel-modules/v6/introduction) - modules
- [Vue 3](https://v3.vuejs.org/) - frontend framework
- [Windi CSS](https://windicss.org/) - css framework
- [Vite](https://vitejs.dev/) - build tools
- [pnpm](https://pnpm.io/) - package manager
- [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) - code formatter
- [ESLint](https://eslint.org/) - code linter
- [Husky](https://typicode.github.io/husky/#/) with [Commitlint](https://commitlint.js.org/#/) & [Stylelint](https://stylelint.io/)

## Setup

Follow the steps mentioned below to install and run the project.

1. Clone or download the repository
2. Go to the project directory and run `composer install`
3. Create `.env` file by copying the `.env.example`. You may use this command to do that `cp .env.example .env`
4. Generate key by running `php artisan key:generate`
5. Update the database configuration in `.env`
6. Migrate the database by running `php artisan migrate`
7. Link storage directory `php artisan storage:link`
8. Run `pnpm install` to install js packages
9. Run `pnpm run dev` or `pnpm run build` to generate the frontend assets

If you have docker you can run `sail up -d` to start the webserver and other services. [Learn more](https://laravel.com/docs/8.x/sail).

## TODO

- [ ] More documentation on how to do what
- [ ] Tests (currently learning and deciding what to use)

## License

[MIT license](https://opensource.org/licenses/MIT).
