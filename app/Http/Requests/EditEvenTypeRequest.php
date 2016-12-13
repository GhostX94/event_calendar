<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Routing\Route;


class EditEvenTypeRequest extends FormRequest
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
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:1|max:255|unique:event_types,name,'.$this->route->getParameter('id')
        ];
    }
}
