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
        $permissions = [
            'Super Admin' => [], // No need to put any permission here

            'Sample Role' => ['Sample Permission'],
        ];

        foreach ($permissions as $roleStr => $rolePermissions) {
            /** @var \Spatie\Permission\Models\Role  */
            $role = Role::findOrCreate($roleStr);

            foreach ($rolePermissions as $permission) {
                Permission::findOrCreate($permission);
            }

            $role->syncPermissions($rolePermissions);

            echo "Role '{$roleStr}' created\n";
        }
    }
}
