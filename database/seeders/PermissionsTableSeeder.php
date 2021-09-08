<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = ['Manage permissions', 'Manage users'];

        $roles = [
            'Super Admin' => [], // No need to put any permission here
        ];

        echo "Creating permissions...\n";
        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
            echo "'{$permission}' created\n";
        }

        echo "\nCreating roles...\n";
        foreach ($roles as $roleStr => $rolePermissions) {
            /** @var \Spatie\Permission\Models\Role  */
            $role = Role::findOrCreate($roleStr);
            $role->syncPermissions($rolePermissions);

            echo "'{$roleStr}' created\n";
        }
    }
}
