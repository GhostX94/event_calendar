<validator name="validation">
	<form novalidate>
	{{--<meta id="_token" value="{{ csrf_token() }}">--}}
	<!-- Name Field -->
	<div class="form-group col-sm-6">
	    <label for="name">Nombre:</label>
	    <input type="text" class="form-control" v-model="row.name" v-validate:name="{ required: true, minlength: 1, maxlength: 128{{-- , unique: providers --}} }" data-type="text" />
	    <div v-if="$validation.name.invalid" class="alert alert-danger" role="alert">
				<div v-if="$validation.name.required">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(required) Message Here
			</div>
			<div v-if="$validation.name.minlength">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(minlength) Message Here
			</div>
			<div v-if="$validation.name.maxlength">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(maxlength) Message Here
			</div>
			{{-- <div v-if="$validation.name.unique">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(unique) Message Here
			</div> --}}
		</div>
	</div>	
	</form>
</validator>