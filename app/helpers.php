<?php

use App\Http\Resources\AuthUserResource;
use Illuminate\Support\Facades\Auth;
use Nwidart\Modules\Facades\Module;

if (!function_exists('init_data')) {
    /**
     * Return array containing data used for initiating frontend state.
     *
     * @return array
     */
    function init_data()
    {
        $authenticated = Auth::check();

        return [
            'authenticated' => $authenticated,
            'user' => $authenticated ? new AuthUserResource(Auth::user()) : null,
            'features' => array_keys(Module::allEnabled()),
        ];
    }
}
