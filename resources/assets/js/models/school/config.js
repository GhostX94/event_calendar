
var objectRow = {            
    id: "",
    name: "",
    image: "",
    created_at: "",
    updated_at: "",
};

var tableColumns = [
    {
        name: 'id',
        title: 'id',    
        sortField: 'id',
        visible:false
    },
    {
        name: 'name',
        sortField: 'name',
    },
    {
        name: 'created_at',
        title: 'Creado en',
        sortField: 'created_at',
        visible: false
    },
    {
        name: 'updated_at',
        title: 'Actualizado en',
        sortField: 'updated_at',
        visible: false
    }, 
    {
        name: '__actions',
        dataClass: 'text-center',
    }
]

var actions = [
        { name: 'view-item', label: '', icon: 'glyphicon glyphicon-zoom-in', class: 'btn btn-info', extra: {'title': 'View', 'data-toggle':"tooltip", 'data-placement': "left"} },
        { name: 'edit-item', label: '', icon: 'glyphicon glyphicon-pencil', class: 'btn btn-warning', extra: {title: 'Edit', 'data-toggle':"tooltip", 'data-placement': "top"} },
        { name: 'delete-item', label: '', icon: 'glyphicon glyphicon-remove', class: 'btn btn-danger', extra: {title: 'Delete', 'data-toggle':"tooltip", 'data-placement': "right" } }
];