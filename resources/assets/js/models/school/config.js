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
                name: 'email',
                sortField: 'email',
            },
            {
                name: 'nickname',
                sortField: 'nickname',
                callback: 'allCap'
            },
            {
                name: 'birthdate',
                sortField: 'birthdate',
                //callback: 'formatDate|D/MM/Y'
            },
            {
                name: 'gender',
                sortField: 'gender',
                titleClass: 'text-center',
                dataClass: 'text-center',
                callback: 'gender'
            },
            {
                name: 'address',
                sortField: 'address',
                callback: 'address',
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