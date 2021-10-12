# Play Modules

Me playing around with modulated laravel.

## What this starter have?

- [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) & [Fortify](https://laravel.com/docs/8.x/fortify) - authentication
- [Laravel Sail](https://laravel.com/docs/8.x/sail) - dockerize laravel
- [Laravel Permission](https://spatie.be/docs/laravel-permission/v5/introduction) - permissions & roles
- [Laravel Modules](https://nwidart.com/laravel-modules/v6/introduction) - modules
- [Vue 2](https://vuejs.org/) - frontend framework
- [Vuetify](https://vuetifyjs.com/en/) - ui components
- Typescript
- Prettier - code formatter
- ESLint
- Husky with Commitlint & Stylelint

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

- [ ] Migrate to Vue 3 and custom UI
- [ ] More documentation on how to do what

## License

[MIT license](https://opensource.org/licenses/MIT).
