<?php

namespace Modules\User\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class ListUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('viewAny', User::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'page' => ['sometimes', 'numeric'],
            'per_page' => ['sometimes', 'numeric', 'max:100'],
            'search' => ['sometimes', 'string'],
            'order_by' => ['sometimes', 'string'],
            'order_desc' => ['sometimes', 'boolean'],
        ];
    }
}
