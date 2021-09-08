<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Rules\Password;

trait PasswordValidationRules
{
    /**
     * Get the validation rules used to validate passwords.
     *
     * @param bool $required
     * @return array
     */
    protected function passwordRules($required = true)
    {
        return [$required ? 'required' : 'sometimes', 'string', new Password(), 'confirmed'];
    }
}
