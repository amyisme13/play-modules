<?php

namespace Modules\User\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Requests\CreateUserRequest;
use Modules\User\Http\Requests\ListUserRequest;
use Modules\User\Http\Requests\UpdateUserRequest;
use Modules\User\Transformers\UserResource;

class UserController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     *
     * @param \Modules\User\Http\Requests\ListUserRequest $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(ListUserRequest $request)
    {
        $users = User::query()
            ->where('name', 'like', "%{$request->search}%")
            ->orWhere('email', 'like', "%{$request->search}%")
            ->orderBy($request->order_by ?? 'id', $request->order_desc ? 'desc' : 'asc')
            ->paginate($request->per_page ?? 15);

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Modules\User\Http\Requests\CreateUserRequest $request
     * @return \Modules\User\Transformers\UserResource
     */
    public function store(CreateUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return new UserResource($user);
    }

    /**
     * Show the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Modules\User\Transformers\UserResource
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Modules\User\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User $user
     * @return \Modules\User\Transformers\UserResource
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if ($request->has('password')) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return response()->noContent();
    }
}
