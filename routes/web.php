<?php

use Illuminate\Support\Facades\Route;
use Nwidart\Modules\Facades\Module;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/auth/reset', 'app')->name('password.reset');
Route::view('/auth/login', 'app')->name('login');

Route::fallback(fn() => view('app'));
