<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Nwidart\Modules\Facades\Module;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(array_keys(Module::allEnabled()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->validate([
            'modules' => ['required', 'array'],
            'modules.*.name' => ['required', 'string'],
            'modules.*.enabled' => ['required', 'boolean'],
        ]);

        foreach ($input['modules'] as $item) {
            $module = Module::find($item['name']);
            if ($module->isDisabled() && $item['enabled']) {
                $module->enable();
            } elseif ($module->isEnabled() && !$item['enabled']) {
                $module->disable();
            }
        }

        return response()->json(array_keys(Module::allEnabled()));
    }
}
