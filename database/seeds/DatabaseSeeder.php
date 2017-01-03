<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTableSeeder::class);
        $this->call(EventTypeTableSeeder::class);
        $this->call(SchoolLevelTableSeeder::class);
        $this->call(SchoolTableSeeder::class);
        $this->call(RolePermissionTableSeeder::class);
        $this->call(TypePersonTableSeeder::class);
    }
}
