<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function viewAny(User $user)
    {
        if ($user->can('Manage permissions')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \Spatie\Permission\Models\Role  $role
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function view(User $user, Role $role)
    {
        if ($user->can('Manage permissions')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function create(User $user)
    {
        if ($user->can('Manage permissions')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \Spatie\Permission\Models\Role  $role
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function update(User $user, Role $role)
    {
        if ($role->name === 'Super Admin') {
            return false;
        }

        if ($user->can('Manage permissions')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \Spatie\Permission\Models\Role  $role
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function delete(User $user, Role $role)
    {
        if ($role->name === 'Super Admin') {
            return false;
        }

        if ($user->can('Manage permissions')) {
            return true;
        }
    }
}
