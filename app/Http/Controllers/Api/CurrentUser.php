<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthUserResource;
use Illuminate\Http\Request;

class CurrentUser extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\AuthUserResource
     */
    public function __invoke(Request $request)
    {
        return new AuthUserResource($request->user());
    }
}
