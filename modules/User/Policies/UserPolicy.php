<?php

namespace Modules\User\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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
        if ($user->can('Manage users')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function view(User $user, User $model)
    {
        if ($user->can('Manage users')) {
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
        if ($user->can('Manage users')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function update(User $user, User $model)
    {
        if ($user->can('Manage users')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool|void
     */
    public function delete(User $user, User $model)
    {
        if ($user->can('Manage users')) {
            return true;
        }
    }
}
