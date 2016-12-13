<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Routing\Route;

class EditSchoolLevelRequest extends FormRequest
{

    protected $route;

    public function __construct(Route $route ) {
        $this->route = $route;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:1|max:255|unique:school_levels,name,'.$this->route->getParameter('id')    
        ];
    }
}
