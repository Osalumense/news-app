<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', 'App\Http\Controllers\API\UserController@login');
Route::post('register', 'App\Http\Controllers\API\UserController@register');
Route::get('articles', 'App\Http\Controllers\API\ArticleController@index');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('profile', 'App\Http\Controllers\API\UserController@details');
    Route::put('updateProfile', 'App\Http\Controllers\API\UserController@update');
    Route::put('updateInterested', 'App\Http\Controllers\API\UserController@updateInterested');
    Route::get('getSource', 'App\Http\Controllers\API\PersonalizedController@getSource');
    Route::get('personalizedArticle', 'App\Http\Controllers\API\ArticleController@PersonalizedArticle');
});
