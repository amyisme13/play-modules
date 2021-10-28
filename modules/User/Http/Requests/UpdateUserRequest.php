<?php

namespace Modules\User\Http\Requests;

use App\Actions\Fortify\PasswordValidationRules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('update', $this->route('user'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route('user')->id;

        return [
            'email' => ['required', 'email', 'max:255', "unique:users,email,{$id}"],
            'name' => ['required', 'string', 'max:255'],
            'password' => $this->passwordRules(false),
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['sometimes', 'string', Rule::notIn('Super Admin'), 'exists:roles,name'],
        ];
    }
}
