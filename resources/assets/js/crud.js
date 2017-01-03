/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

var Vue = require('vue')
var VueResource = require('vue-resource')
var Vuetable = require('vuetable/src/components/Vuetable.vue')
var VuetablePagination = require('vuetable/src/components/VuetablePagination.vue')
var VuetablePaginationDropdown = require('vuetable/src/components/VuetablePaginationDropdown.vue')
var VuetablePaginationBootstrap = require('vuetable/src/components/VuetablePaginationBootstrap.vue')
//var VuetablePaginationSimple = require('../vendor/vue-table/components/VuetablePaginationSimple.vue')
//var VueEditable = require('../vendor/vue-editable/vue-editable.js')
var VueStrap = require('vue-strap/dist/vue-strap.min.js')
//var vSelect = require('vue-select')
//var CustomVueSelectTemplate = require('./vue-components/vue-select.vue')
var VueValidator = require('vue-validator/dist/vue-validator.min.js')

var VueFileUpload = require('vue-upload-component/dist/vue-upload-component.min.js');

var VueFullCalendar = require('vue-fullcalendar/dist/vue-fullcalendar.min.js')

const decamelize = require('decamelize');


Vue.use(VueResource)
/*Vue.use(VueEditable)*/
Vue.use(VueValidator)

//Vue.component('v-select', vSelect)
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination)
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)
Vue.component('vuetable-pagination-bootstrap', VuetablePaginationBootstrap)
//Vue.component('vuetable-pagination-simple', VuetablePaginationSimple)
Vue.component('vuefileupload', VueFileUpload)
Vue.component('v-full-calendar', VueFullCalendar)


var E_SERVER_ERROR = 'Error communicating with the server';

Vue.config.debug = true
Vue.config.devtools = true  

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;


/*Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});*/


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

//Vue.component('example', require('./components/Example.vue'));

/*Vue.component('custom-action', {
        template: [
            '<div>',
                '<button @click="itemAction(\'view-item\', rowData)"><i class="glyphicon glyphicon-zoom-in"></i></button>',
                '<button @click="itemAction(\'edit-item\', rowData)"><i class="glyphicon glyphicon-pencil"></i></button>',
                '<button @click="itemAction(\'delete-item\', rowData)"><i class="glyphicon glyphicon-remove"></i></button>',
            '</div>'
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            itemAction: function(action, data) {
                sweetAlert('custom-action: ' + action, data.name)
            },
            onClick: function(event) {
                console.log('custom-action: on-click', event.target)
            },
            onDoubleClick: function(event) {
                console.log('custom-action: on-dblclick', event.target)
            }
        }
    })
    Vue.component('my-detail-row', {
        template: [
            '<div class="detail-row ui form" @click="onClick($event)">',
                '<div class="inline field">',
                    '<label>Name: </label>',
                    '<span>{{rowData.name}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Email: </label>',
                    '<span>{{rowData.email}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Nickname: </label>',
                    '<span>{{rowData.nickname}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Birthdate: </label>',
                    '<span>{{rowData.birthdate}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Gender: </label>',
                    '<span>{{rowData.gender}}</span>',
                '</div>',
            '</div>',
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            onClick: function(event) {
                console.log('my-detail-row: on-click')
            }
        },
    })
    */
    window.vm = new Vue(
    {
        components: {
            modal: VueStrap.modal,
        },
        el: '#app',
        //mixins: [mixin],
        data: {
            formModal: false,
            infoModal: false,
            showModal: false,
            deleteModal: false,
            lastOpenModal: [],
            localModals: (typeof(modals) !== 'undefined' ? modals : {}),
            flashMessage: null,
            defaultErrorMessage: 'Some errors in sended data, please check!.',
            flashTypeDanger: 'danger',
            errorMessages: '',
            flashType: null,
            url: apiUrl,
            row: objectRow,
            foreignData: new Array(),
            searchFor: '',
            columns: tableColumns,
            sortOrder: [{
                field: fieldInitOrder,
                direction: 'asc'
            }],
            multiSort: true,
            perPage: 10,
            paginationComponent: 'vuetable-pagination',
            paginationInfoTemplate: 'แสดง {from} ถึง {to} จากทั้งหมด {total} รายการ',
            itemActions: (typeof(actions) !=='undefined' ? actions : {}),
            moreParams: [],

            /*Vue fullcalendar*/
             fcEvents : (typeof(demoEvents) !== 'undefined' ? demoEvents : {}),

             file: null,

        },
        created: function () {
            console.log('Ready')
        },
        watch: {
            'perPage': function(val, oldVal) {
                this.$broadcast('vuetable:refresh')
            },
            'paginationComponent': function(val, oldVal) {
                this.$broadcast('vuetable:load-success', this.$refs.vuetable.tablePagination)
                this.paginationConfig(this.paginationComponent)
            }
        },
        methods: {
            /**
             * Callback functions
             */
            allCap: function(value) {
                return value.toUpperCase()
            },
            gender: function(value) {
              return value == 'M'
                ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>'
                : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>'
            },
            formatDate: function(value, fmt) {
                if (value == null) return ''
                fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt
                return moment(value, 'YYYY-MM-DD').format(fmt)
            },
            showDetailRow: function(value) {
                var icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'glyphicon glyphicon-minus-sign' : 'glyphicon glyphicon-plus-sign'
                return [
                    '<a class="show-detail-row">',
                        '<i class="' + icon + '"></i>',
                    '</a>'
                ].join('')
            },
           
            /**
             * Other functions
             */
            setFilter: function() {
                this.moreParams = [
                    'filter=' + this.searchFor
                ]
                this.$nextTick(function() {
                    this.$broadcast('vuetable:refresh')
                })
            },
            resetFilter: function() {
                this.searchFor = ''
                this.setFilter()
            },
            preg_quote: function( str ) {
                // http://kevin.vanzonneveld.net
                // +   original by: booeyOH
                // +   improved by: Ates Goral (http://magnetiq.com)
                // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // +   bugfixed by: Onno Marsman
                // *     example 1: preg_quote("$40");
                // *     returns 1: '\$40'
                // *     example 2: preg_quote("*RRRING* Hello?");
                // *     returns 2: '\*RRRING\* Hello\?'
                // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
                // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
                return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
            },
            highlight: function(needle, haystack) {
                return haystack.replace(
                    new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
                    '<span class="highlight">$1</span>'
                )
            },
            makeDetailRow: function(data) {
                return [
                    '<td colspan="7">',
                        '<div class="detail-row">',
                            '<div class="form-group">',
                                '<label>Name: </label>',
                                '<span>' + data.name + '</span>',
                            '</div>',
                            '<div class="form-group">',
                                '<label>Email: </label>',
                                '<span>' + data.email + '</span>',
                            '</div>',
                            '<div class="form-group">',
                                '<label>Nickname: </label>',
                                '<span>' + data.nickname + '</span>',
                            '</div>',
                            '<div class="form-group">',
                                '<label>Birthdate: </label>',
                                '<span>' + data.birthdate + '</span>',
                            '</div>',
                            '<div class="form-group">',
                                '<label>Gender: </label>',
                                '<span>' + data.gender + '</span>',
                            '</div>',
                        '</div>',
                    '</td>'
                ].join('')
            },
            rowClassCB: function(data, index) {
                return (index % 2) === 0 ? 'positive' : ''
            },
            paginationConfig: function(componentName) {
                console.log('paginationConfig: ', componentName)
                if (componentName == 'vuetable-pagination') {
                    this.$broadcast('vuetable-pagination:set-options', {
                        wrapperClass: 'pagination',
                        icons: { first: '', prev: '', next: '', last: ''},
                        activeClass: 'active',
                        linkClass: 'btn btn-default',
                        pageClass: 'btn btn-default'
                    })
                }
                if (componentName == 'vuetable-pagination-dropdown') {
                    this.$broadcast('vuetable-pagination:set-options', {
                        wrapperClass: 'form-inline',
                        icons: { prev: 'glyphicon glyphicon-chevron-left', next: 'glyphicon glyphicon-chevron-right' },
                        dropdownClass: 'form-control'
                    })
                }
            },
            // -------------------------------------------------------------------------------------------
            // You can change how sort params string is constructed by overriding getSortParam() like this
            // -------------------------------------------------------------------------------------------
            // getSortParam: function(sortOrder) {
            //     console.log('parent getSortParam:', JSON.stringify(sortOrder))
            //     return sortOrder.map(function(sort) {
            //         return (sort.direction === 'desc' ? '+' : '') + sort.field
            //     }).join(',')
            // }
            submit: function(model = null, type = null, related = null){
                this.row._token = token;
                //Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#_token').getAttribute('value');
                Vue.http.headers.common['X-CSRF-TOKEN'] = token;

                var formData = new FormData();
                var keys = '';
                var data = '';
                var actionUrl = "";

                if (!model || model.target) 
                {
                    keys = Object.keys(this.row);
                    data = this.row;
                    keys.forEach(function (index) {
                        formData.append(index, data[index]);
                    });

                    if (this.method == 'PATCH' || this.method == 'POST') {
                        if (this.method == 'PATCH') {
                            actionUrl = this.url.update + this.row.id;
                            this.$http.patch(actionUrl, formData)
                            .then(this.success, this.failed);
                        }else if(this.method == 'POST'){
                            actionUrl = this.url.store;
                            this.$http.post(actionUrl, formData)
                            .then(this.success, this.failed);
                        }
                    }else if(this.method == 'DELETE'){
                        actionUrl = this.url.delete + this.row.id;
                        this.$http.delete(actionUrl, formData)
                        .then(this.success, this.failed);
                    }
                }else if(related){
                    console.log ('Related: ' + related)       
                    console.log ('Model: ' + model)
                }else{       
                    //console.log ('Model: ' + model);
                    actionUrl = this.url.foreign[model][type].url;
                    //this.method = this.url.foreign[model][type].method;
                    keys = Object.keys(this.row[model]);
                    data = this.row[model];
                    keys.forEach(function (index) {
                        formData.append(index, data[index]);
                    });
                    this.$http.post(actionUrl, formData)
                        .then(this.success2, this.failed);
                }
            },
            success: function(response){
                var lastOpenModal = vm.lastOpenModal.pop();
                console.log(lastOpenModal);
                if ( response.data.data ) {
                    var data = response.data.data;
                    var actions = lastOpenModal.split('_');
                    var map = 'row';
                    if ( actions.length && actions[2] == 'inform' ) {
                        map += '.' + actions[0];
                        var field = decamelize(actions[0]);
                        this.row[ field + '_id' ] = data.id; 
                    }
                    vm.$set(map, data);
                    console.log(JSON.stringify(this.row));
                }
                if (this.method == 'POST' || this.method == 'PATCH' || this.method == 'DELETE')
                    this.$broadcast('vuetable:reload');
                var message = response.data.message;
                vm.flashMessage = message;
                vm.flashType = 'success';
            },
            success2: function(response){
                var lastOpenModal = this.lastOpenModal.pop();              
                if (response.data.data) {
                    var map = 'row';
                    var data = response.data.data;
                    var actions = lastOpenModal.split('_');
                    if ( actions.length && actions[2] == 'inform' ) {
                        map += '.' + actions[0];
                        var field = decamelize(actions[0]);
                        this.row[ field + '_id' ] = data.id; 
                    }
                    if(response.data.imageUrl){
                        this.file = '/' + response.data.imageUrl;
                    }

                    this.$set(map, data);
                    //console.log("success2");
                    //console.log(JSON.stringify(response.data));
                }
                if (this.method == 'POST' || this.method == 'PATCH' || this.method == 'DELETE')
                    this.$broadcast('vuetable:reload');
                var message = response.data.message;
                this.flashMessage = message;
                this.flashType = 'success'; 
            },
            failed: function(response){
                console.log(response);
                this.flashMessage = this.defaultErrorMessage;
                this.flashType = this.flashTypeDanger;
                if (response.body) {
                    vm.updateErrors(response.body);
                    //console.log("errors", response.data);
                }
            },
            updateErrors: function(errors) {
                this.errorMessages = [];
                for (var fieldAttr in errors) {
                    var errorMgs = errors[fieldAttr];
                    for (var msg in errorMgs) {
                        //errorMessages.push({ field: fieldAttr, message: errorMgs[msg] });                       
                        this.errorMessages.push(errorMgs[msg]);                       
                    }
                }
                //console.log("errors", this.errorMessages);*/
            },
            getData: function(url = null){
                if (!url) {
                    this.sendData(this.url.show + this.row.id, 'GET')
                    .then(this.success2, this.failed);                
                } else {
                   this.sendData(url, 'GET')
                    .then(this.success2, this.failed);    
                }
            },
            getForeignData: function(callUrl = null, mapVar = null, related = null, action = 'index'){
                var foreign = this.url.foreign[related][action];
                if(callUrl == null)
                    callUrl = foreign.url;

                var sendParams = {url: callUrl, method: foreign.method, data:{}};
                this.$http(sendParams)
                    .then(function(response){
                        if(response.data.data){
                            var data = response.data.data;
                            var currentForeignData = vm.foreignData;
                            currentForeignData[mapVar] = data;
                            var count = data.length;
                            if(count === undefined)
                                count = Object.keys(data).length;
                            currentForeignData[mapVar + 'Count'] = count;
                            vm.foreignData.push(currentForeignData);
                        }
                    });
            },
            cleanData: function() {
                this.row = objectRow;
                this.flashMessage = '';
                this.flashType = '';
            },
            sendData: function(callUrl, method, data = {}) {
                return this.$http({url: callUrl, method: method, data: data});
            }, 
            visible: function(field) {
                for (var column in this.columns) {
                    if (this.columns[column].name == field || 
                        this.columns[column].name == field + '_format' ||
                        this.columns[column].name == field + '_name') 
                        return this.columns[column].visible;
                }
                return false;
            },
            modal: function(type){
                var number = vm.lastOpenModal.length - 1;
                var index = (number >= 0) ? number : 0; 
                console.log(index);

                if (type == 'PATCH' || type == 'POST') {
                    vm.lastOpenModal.push('formModal');
                    vm.method = type;
                    vm.formModal = true;
                } else if (type == 'SHOW') {
                    vm.lastOpenModal.push('showModal');
                    vm.method = type;
                    vm.showModal = true;
                } else if (type == 'DELETE') {
                    vm.lastOpenModal.push('deleteModal');
                    vm.method = type;
                    vm.deleteModal = true;
                } else if (type == 'INFO') {
                    vm.lastOpenModal.push('infoModal');
                    vm.infoModal = true;
                } else {
                    vm.lastOpenModal.push(type);
                    vm.localModals[type] = true;                
                }
            },
            closeModal: function(modalName){
                if (modalName == this.lastOpenModal[this.lastOpenModal.length - 1])
                    this.lastOpenModal.pop();
                            
                if (this.localModals[modalName] != undefined)
                    this.localModals[modalName] = false;
                else
                    this.$set(modalName, false);
                
                this.cleanData();  
                //console.log("Cerrado");
            },
            onFileChange: function(event){
                var files = event.target.files || event.dataTransfer.files;
                if (!files.length)
                    return;
                this.row.image = files[0];
                this.createImage(files[0]);
            },
            createImage(file) {
              var image = new Image();
              var reader = new FileReader();

              reader.onload = (e) => {
                this.file = e.target.result;
              };
              reader.readAsDataURL(file);
              //console.log(JSON.stringify(this.row));
            },
            removeImage: function (e) {
              //this.row.image = '';
              this.file = '';
            }
        },
        events: {
            'vuetable:row-changed': function(data) {
                //console.log('row-changed:', data.name)
            },
            'vuetable:row-clicked': function(data, event) {
                console.log('row-clicked:', data.name)
            },
            'vuetable:cell-clicked': function(data, field, event) {
                console.log('cell-clicked:', field.name)
                if (field.name !== '__actions') {
                    this.$broadcast('vuetable:toggle-detail', data.id)
                }
            },
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)

                this.row.id = data.id;
                this.getData();
                if (action == 'view-item') {
                    this.modal('SHOW');
                    this.lastOpenModal.push('showModal');
                } else if (action == 'edit-item') {
                    this.modal('PATCH');
                    this.lastOpenModal.push('formModal');
                } else if (action == 'delete-item') {
                    this.modal('DELETE');
                    this.lastOpenModal.push('deleteModal');
                }
            },
            'vuetable:load-success': function(response) {
                var data = response.data.data
                //console.log(response.data)
                /*if (this.searchFor !== '') {
                    for (n in data) {
                        data[n].name = this.highlight(this.searchFor, data[n].name)
                        data[n].email = this.highlight(this.searchFor, data[n].email)
                    }
                }*/
            },
            'vuetable:load-error': function(response) {
                if (response.status == 400) {
                    console.log('Something\'s Wrong!', response.data.message, 'error')
                } else {
                    console.log('Oops', E_SERVER_ERROR, 'error')
                }
            },

            changeMonth: function (start, end, current) {
              console.log('changeMonth', start, end, current)
            },
            eventClick: function(event, jsEvent, pos) {
               console.log('eventClick', event, jsEvent, pos)
            },
            dayClick: function(day, jsEvent) {
              console.log('dayClick', day, jsEvent)
            },
            moreClick: function(day, events, jsEvent) {
              console.log('moreCLick', day, events, jsEvent)
            }
        }
    })