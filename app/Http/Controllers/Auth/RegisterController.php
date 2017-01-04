<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Calendar\Person\PersonRepository;
use App\Calendar\PersonPhoto\PersonPhotoRepository;
use App\Calendar\TypePerson\TypePersonRepository;
use App\Calendar\Town\TownRepository;

class RegisterController extends Controller
{

    protected $personRepository;
    protected $personPhotoRepository;
    protected $typePersonRepository;
    protected $townRepository;

    public function __construct(PersonRepository $personRepository, 
        PersonPhotoRepository $personPhotoRepository,
        TypePersonRepository $typePersonRepository,
        TownRepository $townRepository){

        $this->personRepository = $personRepository;
        $this->personPhotoRepository = $personPhotoRepository;
        $this->typePersonRepository = $typePersonRepository;
        $this->townRepository = $townRepository;
    }

    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/admin/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'firts_name' => 'required|max:75',
            'last_name' => 'required|max:75',
            'birthdate' => 'required|date',
            'address' => 'required|max:250',
            'phone' => 'required',
            'type_person_id' => 'required|integer|exists:type_persons,id',
            'town_id' => 'required|integer|exists:towns,id',
            'password' => 'required|min:6|confirmed',
            'photo' => 'mimes:jpeg,jpg,png,gif|max:10000',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $user =  User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'active' => 0
        ]);


        $town = $this->townRepository->get($data['town_id']);
        $typePerson = $this->typePersonRepository->get($data['type_person_id']);

        $this->personRepository->getModel()->firts_name = $data['firts_name'];
        $this->personRepository->getModel()->last_name = $data['last_name'];
        $this->personRepository->getModel()->birthdate = $data['birthdate'];
        $this->personRepository->getModel()->address = $data['address'];
        $this->personRepository->getModel()->phone = $data['phone'];
        $person = $this->personRepository->getModel();

        $user->person()->save($person);
        $town->person()->save($person);
        $typePerson->person()->save($person);

        $person->save();

        if (array_key_exists('photo', $data)) 
        {
            $data['person_id'] = $person->id;
            $this->personPhotoRepository->registerImage(
                $data['photo'], 
                'storage/persons/', 
                $data
            );
        }

        return $user;
    }
}
