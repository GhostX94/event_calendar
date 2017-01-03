<?php

use Illuminate\Database\Seeder;
use App\Calendar\Role\Role;
use App\Calendar\Permission\Permission; 
use App\Calendar\User\User;

class RolePermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $employee = new Role();
		$employee->name         = 'employee';
		$employee->display_name = 'Project employee';
		$employee->description  = 'User is the employee of a given project';
		$employee->save();

		$admin = new Role();
		$admin->name         = 'admin';
		$admin->display_name = 'User Administrator'; 
		$admin->description  = 'User is allowed to manage and edit other users';
		$admin->save();

		$createItem = new Permission();
		$createItem->name         = 'create';
		$createItem->display_name = 'Create Items';
		$createItem->description  = 'Create items from any model'; 
		$createItem->save();

		$editItem = new Permission();
		$editItem->name         = 'edit';
		$editItem->display_name = 'Edit item';
		$editItem->description  = 'edit existing item';
		$editItem->save();

		$deleteItem = new Permission();
		$deleteItem->name         = 'delete';
		$deleteItem->display_name = 'Delete item';
		$deleteItem->description  = 'delete existing item';
		$deleteItem->save();


		$admin->attachPermissions([$createItem, $editItem, $deleteItem]);
		$employee->attachPermissions([$createItem, $editItem]);

		$userAdmin = User::find(1);
		$userEmployee = User::find(2);

		$userAdmin->attachRole($admin);
		$userEmployee->attachRole($employee);
    }
}
