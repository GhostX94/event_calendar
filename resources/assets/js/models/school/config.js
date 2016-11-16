// fields definition
        var tableColumns = [
            {
                name: 'id',
                title: '',
                dataClass: 'text-center',
                callback: 'showDetailRow'
            },
            {
                name: 'name',
                sortField: 'name',
            },
            {
                name: '__component:custom-action',
                title: "Component",
                titleClass: 'center aligned',
                dataClass: 'custom-action center aligned',
            },
            {
                name: '__actions',
                dataClass: 'text-center',
            }
        ]

        var info = "Mensaje";